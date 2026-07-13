package com.example.back_end.service;

import com.example.back_end.dto.response.PublicInstructorProfileResponse;
import com.example.back_end.dto.response.PublicInstructorSummaryResponse;
import com.example.back_end.entity.InstructorProfile;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.entity.enums.RoleName;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.repository.InstructorProfileRepository;
import com.example.back_end.repository.ReviewRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PublicInstructorService {

    private final UserRepository userRepository;
    private final InstructorProfileRepository instructorProfileRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ReviewRepository reviewRepository;
    private final CourseService courseService;

    public List<PublicInstructorSummaryResponse> listInstructors() {
        return userRepository.findAllTeachers().stream()
                .map(this::toSummary)
                .toList();
    }

    public PublicInstructorProfileResponse getInstructorProfile(Long instructorId) {
        User instructor = userRepository.findById(instructorId)
                .filter(u -> !Boolean.TRUE.equals(u.getIsDeleted()))
                .filter(u -> u.getRoles().stream().anyMatch(r -> r.getRoleName() == RoleName.ROLE_TEACHER))
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        InstructorProfile profile = instructorProfileRepository.findById(instructorId).orElse(null);

        return new PublicInstructorProfileResponse(
                instructor.getId(),
                instructor.getFullName(),
                instructor.getAvatar(),
                profile != null ? profile.getAvatarKey() : null,
                profile != null ? profile.getHeadline() : null,
                profile != null ? profile.getDescription() : null,
                profile != null ? profile.getExpertise() : null,
                profile != null ? profile.getSocialLinks() : null,
                instructor.getCreatedAt(),
                courseRepository.countByInstructorIdAndStatusAndIsDeletedFalseAndIsHiddenFalse(instructorId, CourseStatus.PUBLISHED),
                enrollmentRepository.countDistinctStudentsByInstructorId(instructorId),
                reviewRepository.getAverageRatingByInstructorId(instructorId),
                reviewRepository.countByCourseInstructorId(instructorId),
                courseService.getPublishedCoursesByInstructor(instructorId)
        );
    }

    private PublicInstructorSummaryResponse toSummary(User instructor) {
        InstructorProfile profile = instructorProfileRepository.findById(instructor.getId()).orElse(null);

        return new PublicInstructorSummaryResponse(
                instructor.getId(),
                instructor.getFullName(),
                instructor.getAvatar(),
                profile != null ? profile.getAvatarKey() : null,
                profile != null ? profile.getHeadline() : null,
                profile != null ? profile.getExpertise() : null,
                courseRepository.countByInstructorIdAndStatusAndIsDeletedFalseAndIsHiddenFalse(instructor.getId(), CourseStatus.PUBLISHED),
                enrollmentRepository.countDistinctStudentsByInstructorId(instructor.getId()),
                reviewRepository.getAverageRatingByInstructorId(instructor.getId()),
                reviewRepository.countByCourseInstructorId(instructor.getId())
        );
    }
}
