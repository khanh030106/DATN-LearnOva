package com.example.back_end.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back_end.dto.response.InstructorResponse;
import com.example.back_end.dto.response.InstructorResponse.CourseSummary;
import com.example.back_end.dto.resquest.InstructorRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Coursecategory;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.Order;
import com.example.back_end.entity.Orderitem;
import com.example.back_end.entity.Role;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;
import com.example.back_end.repository.RoleRepository;
import com.example.back_end.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminInstructorService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<InstructorResponse> getAllInstructors() {
        return userRepository.findAll().stream()
                .filter(user -> !Boolean.TRUE.equals(user.getIsDeleted()))
                .filter(this::isTeacher)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public InstructorResponse getInstructorById(Long id) {
        User user = userRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        if (!isTeacher(user)) {
            throw new RuntimeException("User is not an instructor");
        }

        return toResponse(user);
    }

    @Transactional
    public InstructorResponse createInstructor(InstructorRequest request) {
        if (userRepository.existsUsersByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        Role teacherRole = roleRepository.findByRoleName(RoleName.ROLE_TEACHER)
                .orElseThrow(() -> new RuntimeException("Teacher role not found"));

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setAvatar(request.avatar());
        user.setPhone(request.phone());
        user.setGender(request.gender());
        user.setIsActive(request.isActive() == null ? true : request.isActive());
        user.setIsDeleted(false);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        user.setRoles(new LinkedHashSet<>(Set.of(teacherRole)));

        User saved = userRepository.save(user);
        return toResponse(saved);
    }

    @Transactional
    public InstructorResponse updateInstructor(Long id, InstructorRequest request) {
        User user = userRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        if (!isTeacher(user)) {
            throw new RuntimeException("User is not an instructor");
        }

        user.setFullName(request.fullName());
        user.setAvatar(request.avatar());
        user.setPhone(request.phone());
        user.setGender(request.gender());
        user.setIsActive(request.isActive() == null ? user.getIsActive() : request.isActive());
        user.setUpdatedAt(Instant.now());

        User updated = userRepository.save(user);
        return toResponse(updated);
    }

    @Transactional
    public void deleteInstructor(Long id) {
        User user = userRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        if (!isTeacher(user)) {
            throw new RuntimeException("User is not an instructor");
        }

        user.setIsDeleted(true);
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);
    }

    private boolean isTeacher(User user) {
        return user.getRoles().stream()
                .map(Role::getRoleName)
                .anyMatch(roleName -> roleName == RoleName.ROLE_TEACHER);
    }

    private InstructorResponse toResponse(User user) {
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
                .map(this::toCourseSummary)
                .collect(Collectors.toList());

        String instructorCode = String.format("GV%03d", user.getId());

        return new InstructorResponse(
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

    private CourseSummary toCourseSummary(Course course) {
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
                course.getThumbnailUrl(),
                category,
                students,
                Math.round(rating * 10.0) / 10.0,
                course.getBasePrice(),
                revenue,
                course.getStatus() == null ? "N/A" : course.getStatus().name(),
                course.getPublishedAt()
        );
    }
}
