package com.example.back_end.service;

import com.example.back_end.dto.response.CreatePaymentResponse;
import com.example.back_end.dto.response.PaymentStatusResponse;
import com.example.back_end.dto.resquest.CreatePaymentRequest;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.EnrollmentId;
import com.example.back_end.entity.Order;
import com.example.back_end.entity.Orderitem;
import com.example.back_end.entity.Payment;
import com.example.back_end.entity.User;
import com.example.back_end.entity.Voucher;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.entity.enums.DiscountType;
import com.example.back_end.entity.enums.OrderStatus;
import com.example.back_end.entity.enums.PaymentMethod;
import com.example.back_end.entity.enums.PaymentStatus;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.repository.OrderRepository;
import com.example.back_end.repository.OrderitemRepository;
import com.example.back_end.repository.PaymentRepository;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.VoucherRepository;
import com.example.back_end.security.CustomUserDetails;
import com.fasterxml.jackson.databind.JsonNode;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private static final String RESPONSE_PAYMENT_METHOD = "PAYOS";

    private final CourseRepository courseRepository;
    private final VoucherRepository voucherRepository;
    private final OrderRepository orderRepository;
    private final OrderitemRepository orderitemRepository;
    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final PayOSService payOSService;

    @Transactional
    public CreatePaymentResponse createPayment(CreatePaymentRequest request) {
        User currentUser = getCurrentUser();
        List<Course> courses = resolveCheckoutCourses(request);
        validateCheckoutCourses(courses, currentUser);

        BigDecimal subtotal = courses.stream()
                .map(Course::getBasePrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        Voucher voucher = null;
        BigDecimal discount = BigDecimal.ZERO;
        if (StringUtils.hasText(request.voucherCode())) {
            voucher = validateVoucher(request.voucherCode(), subtotal);
            discount = calculateDiscount(voucher, subtotal);
        }

        BigDecimal totalAmount = subtotal.subtract(discount);
        long payOSAmount = toPositiveIntegerVnd(totalAmount);
        Instant now = Instant.now();

        Order order = new Order();
        order.setUser(currentUser);
        order.setVoucher(voucher);
        order.setSubtotal(subtotal);
        order.setDiscountAmount(discount);
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(now);
        order.setUpdatedAt(now);
        orderRepository.saveAndFlush(order);

        BigDecimal remainingDiscount = discount;
        List<Orderitem> orderitems = new ArrayList<>();
        for (int index = 0; index < courses.size(); index++) {
            Course course = courses.get(index);
            BigDecimal itemDiscount = index == courses.size() - 1
                    ? remainingDiscount
                    : discount.multiply(course.getBasePrice()).divide(subtotal, 2, RoundingMode.HALF_UP);
            remainingDiscount = remainingDiscount.subtract(itemDiscount);

            Orderitem orderitem = new Orderitem();
            orderitem.setOrder(order);
            orderitem.setCourse(course);
            orderitem.setOriginalPrice(course.getBasePrice());
            orderitem.setPrice(course.getBasePrice().subtract(itemDiscount).max(BigDecimal.ZERO));
            orderitems.add(orderitemRepository.save(orderitem));
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(totalAmount);
        payment.setCurrency("VND");
        payment.setPaymentMethod(resolveStoredPaymentMethod());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setPaidAt(null);
        payment.setUpdatedAt(now);
        paymentRepository.save(payment);

        PayOSService.PayOSCreatePaymentResult payOSPayment =
                payOSService.createPaymentLink(order, courses, payOSAmount);

        payment.setTransactionId(payOSPayment.paymentLinkId());
        payment.setUpdatedAt(Instant.now());
        paymentRepository.save(payment);

        Course primaryCourse = courses.getFirst();
        String courseTitle = courses.size() == 1
                ? primaryCourse.getTitle()
                : primaryCourse.getTitle() + " +" + (courses.size() - 1);

        return new CreatePaymentResponse(
                order.getId(),
                payment.getId(),
                primaryCourse.getId(),
                courseTitle,
                subtotal,
                discount,
                totalAmount,
                RESPONSE_PAYMENT_METHOD,
                payment.getStatus().name(),
                order.getStatus().name(),
                payOSPayment.checkoutUrl(),
                payOSPayment.qrCode(),
                payOSPayment.paymentLinkId(),
                payOSPayment.expiresAt()
        );
    }

    @Transactional
    public PaymentStatusResponse getPaymentStatus(Long orderId) {
        User currentUser = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        if (!isAdmin() && !order.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot view this order");
        }
        Payment payment = paymentRepository.findFirstByOrderIdOrderByIdDesc(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found"));

        syncPayOSPaymentStatus(order, payment);

        List<Orderitem> orderitems = orderitemRepository.findByOrderIdWithCourse(orderId);
        if (orderitems.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order item not found");
        }
        Orderitem primaryOrderitem = orderitems.getFirst();
        Course primaryCourse = primaryOrderitem.getCourse();
        String courseTitle = orderitems.size() == 1
                ? primaryCourse.getTitle()
                : primaryCourse.getTitle() + " +" + (orderitems.size() - 1);

        return new PaymentStatusResponse(
                order.getId(),
                payment.getId(),
                order.getStatus().name(),
                payment.getStatus().name(),
                payment.getPaidAt(),
                primaryCourse.getId(),
                courseTitle,
                order.getTotalAmount()
        );
    }

    @Transactional
    public void handlePayOSWebhook(JsonNode body) {
        if (!payOSService.isSuccessfulWebhook(body)) {
            return;
        }

        JsonNode data = body.path("data");
        String paymentLinkId = data.path("paymentLinkId").asText(null);
        Long orderId = data.path("orderCode").canConvertToLong() ? data.path("orderCode").asLong() : null;

        Payment payment = findPaymentForPayOSWebhook(paymentLinkId, orderId);
        Order order = orderRepository.findByIdForPaymentUpdate(payment.getOrder().getId())
                .orElseThrow(() -> new IllegalStateException("Order not found"));

        if (payment.getStatus() == PaymentStatus.SUCCESS && order.getStatus() == OrderStatus.PAID) {
            return;
        }
        if (order.getStatus() != OrderStatus.PENDING || payment.getStatus() != PaymentStatus.PENDING) {
            throw new IllegalStateException("Order or payment is not pending");
        }

        markOrderPaid(order, payment);
    }

    private void markOrderPaid(Order order, Payment payment) {
        List<Orderitem> orderitems = orderitemRepository.findByOrderIdWithCourse(order.getId());
        if (orderitems.isEmpty()) {
            throw new IllegalStateException("Order item not found");
        }
        User user = order.getUser();

        for (Orderitem orderitem : orderitems) {
            Course course = orderitem.getCourse();
            if (!enrollmentRepository.existsByIdCourseIdAndIdUserId(course.getId(), user.getId())) {
                EnrollmentId enrollmentId = new EnrollmentId();
                enrollmentId.setCourseId(course.getId());
                enrollmentId.setUserId(user.getId());

                Enrollment enrollment = new Enrollment();
                enrollment.setId(enrollmentId);
                enrollment.setCourse(course);
                enrollment.setUser(user);
                enrollment.setOrder(order);
                enrollment.setEnrolledAt(Instant.now());
                enrollment.setProgressPercent(0);
                enrollmentRepository.save(enrollment);
            }
        }

        order.setStatus(OrderStatus.PAID);
        order.setUpdatedAt(Instant.now());
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(OffsetDateTime.now());
        payment.setUpdatedAt(Instant.now());
    }

    private void syncPayOSPaymentStatus(Order order, Payment payment) {
        if (order.getStatus() == OrderStatus.PAID || payment.getStatus() == PaymentStatus.SUCCESS) {
            return;
        }
        if (order.getStatus() != OrderStatus.PENDING || payment.getStatus() != PaymentStatus.PENDING) {
            return;
        }

        try {
            PayOSService.PayOSPaymentInfo payOSPayment = payOSService.getPaymentInfo(order.getId());
            if (StringUtils.hasText(payOSPayment.paymentLinkId())
                    && !payOSPayment.paymentLinkId().equals(payment.getTransactionId())) {
                payment.setTransactionId(payOSPayment.paymentLinkId());
            }
            if ("PAID".equalsIgnoreCase(payOSPayment.status())) {
                Order lockedOrder = orderRepository.findByIdForPaymentUpdate(order.getId())
                        .orElseThrow(() -> new IllegalStateException("Order not found"));
                markOrderPaid(lockedOrder, payment);
                order.setStatus(lockedOrder.getStatus());
                order.setUpdatedAt(lockedOrder.getUpdatedAt());
            }
        } catch (RuntimeException ignored) {
            // Keep polling usable even if payOS status lookup is temporarily unavailable.
        }
    }

    private Voucher validateVoucher(String code, BigDecimal subtotal) {
        Voucher voucher = voucherRepository.findByCodeIgnoreCase(code.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Voucher not found"));
        OffsetDateTime now = OffsetDateTime.now();
        if (!Boolean.TRUE.equals(voucher.getIsActive())
                || now.isBefore(voucher.getStartDate())
                || now.isAfter(voucher.getEndDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Voucher is not active");
        }
        if (voucher.getUsageLimit() != null && voucher.getUsedCount() >= voucher.getUsageLimit()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Voucher usage limit reached");
        }
        if (voucher.getMinimumOrder() != null && subtotal.compareTo(voucher.getMinimumOrder()) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order does not meet voucher minimum amount");
        }
        return voucher;
    }

    private List<Course> resolveCheckoutCourses(CreatePaymentRequest request) {
        List<Long> courseIds = new ArrayList<>();
        if (request.courseIds() != null) {
            request.courseIds().stream()
                    .filter(id -> id != null && id > 0)
                    .forEach(courseIds::add);
        }
        if (request.courseId() != null && request.courseId() > 0) {
            courseIds.add(request.courseId());
        }
        if (courseIds.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least one course is required");
        }

        LinkedHashSet<Long> uniqueCourseIds = new LinkedHashSet<>(courseIds);
        List<Course> courses = courseRepository.findAllById(uniqueCourseIds);
        if (courses.size() != uniqueCourseIds.size()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found");
        }

        return uniqueCourseIds.stream()
                .map(courseId -> courses.stream()
                        .filter(course -> course.getId().equals(courseId))
                        .findFirst()
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found")))
                .toList();
    }

    private void validateCheckoutCourses(List<Course> courses, User currentUser) {
        for (Course course : courses) {
            if (course.getStatus() != CourseStatus.PUBLISHED || Boolean.TRUE.equals(course.getIsDeleted())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Course is not available for purchase");
            }

            if (enrollmentRepository.existsByIdCourseIdAndIdUserId(course.getId(), currentUser.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "You are already enrolled in this course: " + course.getTitle()
                );
            }
        }
    }

    private BigDecimal calculateDiscount(Voucher voucher, BigDecimal subtotal) {
        BigDecimal discount;
        if (voucher.getDiscountType() == DiscountType.Percent) {
            discount = subtotal.multiply(voucher.getDiscountValue())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            if (voucher.getMaximumDiscountAmount() != null
                    && voucher.getMaximumDiscountAmount().compareTo(BigDecimal.ZERO) > 0) {
                discount = discount.min(voucher.getMaximumDiscountAmount());
            }
        } else {
            discount = voucher.getDiscountValue();
        }
        return discount.min(subtotal).max(BigDecimal.ZERO);
    }

    private long toPositiveIntegerVnd(BigDecimal amount) {
        try {
            long value = amount.stripTrailingZeros().longValueExact();
            if (value <= 0) {
                throw new ArithmeticException("Amount must be positive");
            }
            return value;
        } catch (ArithmeticException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Total amount must be an integer VND greater than 0");
        }
    }

    public boolean verifyPayOSWebhook(JsonNode body) {
        return payOSService.verifyWebhook(body);
    }

    private Payment findPaymentForPayOSWebhook(String paymentLinkId, Long orderId) {
        if (StringUtils.hasText(paymentLinkId)) {
            return paymentRepository.findByTransactionId(paymentLinkId)
                    .orElseGet(() -> findPaymentByOrderId(orderId));
        }
        return findPaymentByOrderId(orderId);
    }

    private Payment findPaymentByOrderId(Long orderId) {
        if (orderId == null) {
            throw new IllegalStateException("Missing payOS orderCode");
        }
        return paymentRepository.findFirstByOrderIdOrderByIdDesc(orderId)
                .orElseThrow(() -> new IllegalStateException("Payment not found"));
    }

    private PaymentMethod resolveStoredPaymentMethod() {
        try {
            return PaymentMethod.valueOf(RESPONSE_PAYMENT_METHOD);
        } catch (IllegalArgumentException ignored) {
            return PaymentMethod.VNPAY;
        }
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication == null ? null : authentication.getPrincipal();
        if (principal instanceof CustomUserDetails userDetails) {
            return userRepository.findById(userDetails.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
    }

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
    }
}
