package com.example.back_end.service;

import com.example.back_end.dto.response.MyEnrolledCourseResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.security.CustomUserDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    @Transactional(readOnly = true)
    public List<MyEnrolledCourseResponse> getMyEnrolledCourses() {
        Long userId = getCurrentUserId();

        return enrollmentRepository.findByUserIdWithCourseAndInstructor(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private MyEnrolledCourseResponse toResponse(Enrollment enrollment) {
        Course course = enrollment.getCourse();
        return new MyEnrolledCourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getInstructor().getFullName(),
                course.getLevel(),
                course.getThumbnailKey(),
                enrollment.getProgressPercent(),
                enrollment.getEnrolledAt(),
                enrollment.getCompletedAt()
        );
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication == null ? null : authentication.getPrincipal();
        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails.getId();
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
    }
}
