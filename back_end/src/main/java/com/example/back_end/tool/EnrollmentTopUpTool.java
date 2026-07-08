package com.example.back_end.tool;

import com.example.back_end.entity.Course;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.EnrollmentId;
import com.example.back_end.entity.Order;
import com.example.back_end.entity.Orderitem;
import com.example.back_end.entity.Payment;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.entity.enums.OrderStatus;
import com.example.back_end.entity.enums.PaymentMethod;
import com.example.back_end.entity.enums.PaymentStatus;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.repository.OrderRepository;
import com.example.back_end.repository.OrderitemRepository;
import com.example.back_end.repository.PaymentRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

/**
 * One-off tool: for every user enrolled in fewer than 3 courses, randomly
 * enroll them into more published courses until they have 3-5 total.
 * Creates the full Order -> Orderitem -> Payment -> Enrollment chain so the
 * data is consistent with a real checkout (order/payment marked as already
 * paid/succeeded).
 *
 * Usage: mvn spring-boot:run -Dspring-boot.run.profiles=topup-enrollments
 */
@Component
@Profile("topup-enrollments")
@RequiredArgsConstructor
@Slf4j
public class EnrollmentTopUpTool implements CommandLineRunner {

    private static final int MIN_TARGET = 3;
    private static final int MAX_TARGET = 5;
    private static final String CURRENCY = "VND";

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final OrderRepository orderRepository;
    private final OrderitemRepository orderitemRepository;
    private final PaymentRepository paymentRepository;
    private final ApplicationContext applicationContext;

    @Override
    public void run(String... args) {
        List<Course> publishedCourses = courseRepository
                .findByStatusAndIsDeletedFalseOrderByCreatedAtDesc(CourseStatus.PUBLISHED);

        if (publishedCourses.isEmpty()) {
            log.warn("No published courses found, nothing to enroll into.");
            System.exit(SpringApplication.exit(applicationContext, () -> 0));
            return;
        }

        List<User> users = userRepository.findAll().stream()
                .filter(u -> !Boolean.TRUE.equals(u.getIsDeleted()))
                .toList();

        int usersToppedUp = 0;
        int enrollmentsCreated = 0;

        for (User user : users) {
            List<Enrollment> current = enrollmentRepository.findByUserIdWithCourseAndInstructor(user.getId());

            if (current.size() >= MIN_TARGET) {
                continue;
            }

            Set<Long> enrolledCourseIds = current.stream()
                    .map(e -> e.getCourse().getId())
                    .collect(Collectors.toSet());

            List<Course> candidates = new ArrayList<>(publishedCourses.stream()
                    .filter(c -> !enrolledCourseIds.contains(c.getId()))
                    .toList());
            Collections.shuffle(candidates);

            int target = ThreadLocalRandom.current().nextInt(MIN_TARGET, MAX_TARGET + 1);
            int need = target - current.size();

            if (need <= 0 || candidates.isEmpty()) {
                continue;
            }

            List<Course> toEnroll = candidates.subList(0, Math.min(need, candidates.size()));

            createOrderWithEnrollments(user, toEnroll);

            usersToppedUp++;
            enrollmentsCreated += toEnroll.size();
            log.info("User {}: enrolled into {} new course(s) (had {}, target {})",
                    user.getId(), toEnroll.size(), current.size(), target);
        }

        log.info("Topped up {} users, created {} enrollments in total", usersToppedUp, enrollmentsCreated);

        System.exit(SpringApplication.exit(applicationContext, () -> 0));
    }

    private void createOrderWithEnrollments(User user, List<Course> courses) {
        Instant now = Instant.now();

        BigDecimal subtotal = courses.stream()
                .map(Course::getBasePrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setUser(user);
        order.setSubtotal(subtotal);
        order.setDiscountAmount(BigDecimal.ZERO);
        order.setTotalAmount(subtotal);
        order.setStatus(OrderStatus.PAID);
        order.setCreatedAt(now);
        order.setUpdatedAt(now);
        order = orderRepository.save(order);

        for (Course course : courses) {
            Orderitem item = new Orderitem();
            item.setOrder(order);
            item.setCourse(course);
            item.setOriginalPrice(course.getBasePrice());
            item.setPrice(course.getBasePrice());
            orderitemRepository.save(item);
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(subtotal);
        payment.setCurrency(CURRENCY);
        payment.setPaymentMethod(PaymentMethod.VNPAY);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(OffsetDateTime.now());
        payment.setUpdatedAt(now);
        paymentRepository.save(payment);

        for (Course course : courses) {
            EnrollmentId enrollmentId = new EnrollmentId();
            enrollmentId.setCourseId(course.getId());
            enrollmentId.setUserId(user.getId());

            Enrollment enrollment = new Enrollment();
            enrollment.setId(enrollmentId);
            enrollment.setCourse(course);
            enrollment.setUser(user);
            enrollment.setOrder(order);
            enrollment.setEnrolledAt(now);
            enrollment.setProgressPercent(0);
            enrollmentRepository.save(enrollment);
        }
    }

}
