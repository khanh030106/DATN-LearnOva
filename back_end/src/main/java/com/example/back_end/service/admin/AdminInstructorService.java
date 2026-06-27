package com.example.back_end.service.admin;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back_end.dto.response.admin.AdminInstructorResponse;
import com.example.back_end.dto.response.admin.AdminInstructorResponse.CourseSummary;
import com.example.back_end.dto.resquest.admin.AdminInstructorRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Coursecategory;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.Order;
import com.example.back_end.entity.Orderitem;
import com.example.back_end.entity.Review;
import com.example.back_end.entity.Role;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CoursecategoryRepository;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.repository.OrderitemRepository;
import com.example.back_end.repository.ReviewRepository;
import com.example.back_end.repository.RoleRepository;
import com.example.back_end.repository.admin.AdminCourseRepository;
import com.example.back_end.repository.admin.AdminUserRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminInstructorService {

    private final AdminUserRepository adminUserRepository;
    private final AdminCourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final OrderitemRepository orderitemRepository;
    private final ReviewRepository reviewRepository;
    private final CoursecategoryRepository coursecategoryRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // ─────────────────────────────────────────────
    // PUBLIC API
    // ─────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<AdminInstructorResponse> getAllInstructors() {
        // Query 1 — only users with ROLE_TEACHER; User.roles eagerly batch-loaded after
        List<User> instructors = adminUserRepository.findAllByRoleName(RoleName.ROLE_TEACHER);

        if (instructors.isEmpty()) return List.of();

        List<Long> instructorIds = instructors.stream().map(User::getId).toList();

        // Query 2 — all non-deleted courses for those instructors
        List<Course> allCourses = courseRepository.findByInstructorIdIn(instructorIds);

        if (allCourses.isEmpty()) {
            return instructors.stream()
                    .map(u -> buildInstructorResponseBulk(u, List.of(), Map.of(), Map.of(), Map.of(), Map.of()))
                    .collect(Collectors.toList());
        }

        List<Long> courseIds = allCourses.stream().map(Course::getId).toList();

        // Query 3 — all enrollments for those courses
        // e.getUser().getId() is proxy-FK safe: user_id is @MapsId in EnrollmentId
        List<Enrollment> allEnrollments = enrollmentRepository.findByCourseIdIn(courseIds);

        // Query 4 — all orderitems with their orders JOIN FETCHed (needed for order.getStatus())
        List<Orderitem> allOrderitems = orderitemRepository.findByCourseIdInWithOrder(courseIds);

        // Query 5 — all reviews for those courses (only rating scalar accessed)
        List<Review> allReviews = reviewRepository.findByCourseIdIn(courseIds);

        // Query 6 — all coursecategory rows with category JOIN FETCHed (needed for category.getName())
        List<Coursecategory> allCoursecategories = coursecategoryRepository.findByCourseIdInWithCategory(courseIds);

        // ── In-memory grouping — zero DB calls ─────────────────────────────────
        // All getCourse().getId() / getCourse().getId() calls below are proxy-FK safe:
        // each FK column is stored on the owning row and set on the proxy at load time.
        Map<Long, List<Enrollment>> enrollmentsByCourse = allEnrollments.stream()
                .collect(Collectors.groupingBy(e -> e.getCourse().getId()));
        Map<Long, List<Orderitem>> orderitemsByCourse = allOrderitems.stream()
                .collect(Collectors.groupingBy(oi -> oi.getCourse().getId()));
        Map<Long, List<Review>> reviewsByCourse = allReviews.stream()
                .collect(Collectors.groupingBy(r -> r.getCourse().getId()));
        Map<Long, List<Coursecategory>> categoriesByCourse = allCoursecategories.stream()
                .collect(Collectors.groupingBy(cc -> cc.getCourse().getId()));
        // c.getInstructor().getId() is proxy-FK safe: instructor_id is stored in the courses row
        Map<Long, List<Course>> coursesByInstructor = allCourses.stream()
                .collect(Collectors.groupingBy(c -> c.getInstructor().getId()));

        return instructors.stream()
                .map(u -> buildInstructorResponseBulk(
                        u,
                        coursesByInstructor.getOrDefault(u.getId(), List.of()),
                        enrollmentsByCourse,
                        orderitemsByCourse,
                        reviewsByCourse,
                        categoriesByCourse))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AdminInstructorResponse getInstructorById(Long id) {
        User user = adminUserRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        if (user.getRoles().stream()
                .map(Role::getRoleName)
                .noneMatch(roleName -> roleName == RoleName.ROLE_TEACHER)) {
            throw new BusinessException("User is not an instructor");
        }

        return buildInstructorResponse(user);
    }

    @Transactional
    public AdminInstructorResponse createInstructor(AdminInstructorRequest request) {
        if (adminUserRepository.existsUsersByEmail(request.email())) {
            throw new BusinessException("Email already exists");
        }

        Role teacherRole = roleRepository.findByRoleName(RoleName.ROLE_TEACHER)
                .orElseThrow(() -> new RuntimeException("Teacher role not found"));

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setAvatar(request.avatar());
        user.setCoverImage(request.coverImage());
        user.setPhone(request.phone());

        if (request.dateOfBirth() != null && request.dateOfBirth().isAfter(java.time.LocalDate.now())) {
            throw new BusinessException("Date of birth cannot be in the future");
        }
        user.setDateOfBirth(request.dateOfBirth());

        user.setGender(request.gender());

        String password = request.password() == null ? null : request.password().trim();
        if (password == null || password.isEmpty()) {
            throw new BusinessException("Password is required");
        }
        user.setPasswordHash(passwordEncoder.encode(password));

        user.setIsActive(request.isActive() == null ? true : request.isActive());
        user.setIsDeleted(false);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        user.setRoles(new LinkedHashSet<>(Set.of(teacherRole)));

        User saved = adminUserRepository.save(user);
        return buildInstructorResponse(saved);
    }

    @Transactional
    public AdminInstructorResponse updateInstructor(Long id, AdminInstructorRequest request) {
        User user = adminUserRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        if (user.getRoles().stream()
                .map(Role::getRoleName)
                .noneMatch(roleName -> roleName == RoleName.ROLE_TEACHER)) {
            throw new BusinessException("User is not an instructor");
        }

        user.setFullName(request.fullName());
        user.setAvatar(request.avatar());
        user.setCoverImage(request.coverImage());
        user.setPhone(request.phone());

        if (request.dateOfBirth() != null && request.dateOfBirth().isAfter(java.time.LocalDate.now())) {
            throw new BusinessException("Date of birth cannot be in the future");
        }
        user.setDateOfBirth(request.dateOfBirth());

        user.setGender(request.gender());
        user.setIsActive(request.isActive() == null ? user.getIsActive() : request.isActive());
        user.setUpdatedAt(Instant.now());

        User updated = adminUserRepository.save(user);
        return buildInstructorResponse(updated);
    }

    @Transactional
    public void deleteInstructor(Long id) {
        User user = adminUserRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        if (user.getRoles().stream()
                .map(Role::getRoleName)
                .noneMatch(roleName -> roleName == RoleName.ROLE_TEACHER)) {
            throw new BusinessException("User is not an instructor");
        }

        user.setIsDeleted(true);
        user.setUpdatedAt(Instant.now());
        adminUserRepository.save(user);
    }

    // ─────────────────────────────────────────────
    // PRIVATE MAPPING
    // ─────────────────────────────────────────────

    /**
     * Single-user mapping — used by getInstructorById, createInstructor, updateInstructor.
     * Lazy loads are acceptable here because these are single-record operations.
     */
    private AdminInstructorResponse buildInstructorResponse(User user) {
        Set<Course> courses = user.getCourses().stream()
                .filter(course -> !Boolean.TRUE.equals(course.getIsDeleted()))
                .collect(Collectors.toSet());

        long numberOfClasses = courses.size();

        long totalStudents = courses.stream()
                .flatMap(course -> course.getEnrollments().stream())
                .map(Enrollment::getUser)
                .map(User::getId)
                .distinct()
                .count();

        BigDecimal totalRevenue = courses.stream()
                .flatMap(course -> course.getOrderitems().stream())
                .filter(orderitem -> {
                    Order order = orderitem.getOrder();
                    return order != null
                            && order.getStatus() != null
                            && order.getStatus().name().equals("PAID");
                })
                .map(Orderitem::getPrice)
                .filter(price -> price != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<CourseSummary> courseSummaries = courses.stream()
                .map(course -> {
                    long students = course.getEnrollments().stream()
                            .map(Enrollment::getUser)
                            .map(User::getId)
                            .distinct()
                            .count();

                    double rating = course.getReviews().stream()
                            .map(review -> review.getRating())
                            .filter(value -> value != null)
                            .mapToInt(Integer::intValue)
                            .average()
                            .orElse(0);

                    BigDecimal revenue = course.getOrderitems().stream()
                            .filter(orderitem -> {
                                Order order = orderitem.getOrder();
                                return order != null
                                        && order.getStatus() != null
                                        && order.getStatus().name().equals("PAID");
                            })
                            .map(Orderitem::getPrice)
                            .filter(price -> price != null)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    String category = course.getCoursecategories().stream()
                            .filter(coursecategory -> Boolean.TRUE.equals(coursecategory.getIsPrimary()))
                            .findFirst()
                            .or(() -> course.getCoursecategories().stream().findFirst())
                            .map(Coursecategory::getCategory)
                            .map(Category::getName)
                            .orElse("N/A");

                    return new CourseSummary(
                            course.getId(),
                            course.getTitle(),
                            course.getThumbnailKey(),
                            category,
                            students,
                            Math.round(rating * 10.0) / 10.0,
                            course.getBasePrice(),
                            revenue,
                            course.getStatus() == null ? "N/A" : course.getStatus().name(),
                            course.getPublishedAt()
                    );
                })
                .collect(Collectors.toList());

        String instructorCode = String.format("GV%03d", user.getId());

        return new AdminInstructorResponse(
                user.getId(),
                instructorCode,
                user.getFullName(),
                user.getEmail(),
                user.getAvatar(),
                user.getCoverImage(),
                user.getPhone(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getIsActive(),
                user.getIsDeleted(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                numberOfClasses,
                totalStudents,
                totalRevenue,
                courseSummaries
        );
    }

    /**
     * Bulk mapping — used exclusively by getAllInstructors().
     * All collections are passed in as pre-loaded maps; zero lazy loads occur.
     */
    private AdminInstructorResponse buildInstructorResponseBulk(
            User user,
            List<Course> instructorCourses,
            Map<Long, List<Enrollment>> enrollmentsByCourse,
            Map<Long, List<Orderitem>> orderitemsByCourse,
            Map<Long, List<Review>> reviewsByCourse,
            Map<Long, List<Coursecategory>> categoriesByCourse
    ) {
        long numberOfClasses = instructorCourses.size();

        // e.getUser().getId(): user_id is @MapsId in EnrollmentId — proxy-FK safe
        long totalStudents = instructorCourses.stream()
                .flatMap(c -> enrollmentsByCourse.getOrDefault(c.getId(), List.of()).stream())
                .map(e -> e.getUser().getId())
                .distinct()
                .count();

        BigDecimal totalRevenue = instructorCourses.stream()
                .flatMap(c -> orderitemsByCourse.getOrDefault(c.getId(), List.of()).stream())
                .filter(oi -> {
                    Order order = oi.getOrder();
                    return order != null
                            && order.getStatus() != null
                            && order.getStatus().name().equals("PAID");
                })
                .map(Orderitem::getPrice)
                .filter(p -> p != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<CourseSummary> courseSummaries = instructorCourses.stream()
                .map(course -> {
                    long students = enrollmentsByCourse.getOrDefault(course.getId(), List.of()).stream()
                            .map(e -> e.getUser().getId())
                            .distinct()
                            .count();

                    double rating = reviewsByCourse.getOrDefault(course.getId(), List.of()).stream()
                            .map(Review::getRating)
                            .filter(v -> v != null)
                            .mapToInt(Integer::intValue)
                            .average()
                            .orElse(0);

                    BigDecimal revenue = orderitemsByCourse.getOrDefault(course.getId(), List.of()).stream()
                            .filter(oi -> {
                                Order order = oi.getOrder();
                                return order != null
                                        && order.getStatus() != null
                                        && order.getStatus().name().equals("PAID");
                            })
                            .map(Orderitem::getPrice)
                            .filter(p -> p != null)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    List<Coursecategory> ccs = categoriesByCourse.getOrDefault(course.getId(), List.of());
                    String category = ccs.stream()
                            .filter(cc -> Boolean.TRUE.equals(cc.getIsPrimary()))
                            .findFirst()
                            .or(() -> ccs.stream().findFirst())
                            .map(Coursecategory::getCategory)
                            .map(Category::getName)
                            .orElse("N/A");

                    return new CourseSummary(
                            course.getId(),
                            course.getTitle(),
                            course.getThumbnailKey(),
                            category,
                            students,
                            Math.round(rating * 10.0) / 10.0,
                            course.getBasePrice(),
                            revenue,
                            course.getStatus() == null ? "N/A" : course.getStatus().name(),
                            course.getPublishedAt()
                    );
                })
                .collect(Collectors.toList());

        String instructorCode = String.format("GV%03d", user.getId());

        return new AdminInstructorResponse(
                user.getId(),
                instructorCode,
                user.getFullName(),
                user.getEmail(),
                user.getAvatar(),
                user.getCoverImage(),
                user.getPhone(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getIsActive(),
                user.getIsDeleted(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                numberOfClasses,
                totalStudents,
                totalRevenue,
                courseSummaries
        );
    }
}
