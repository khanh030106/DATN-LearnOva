package com.example.back_end.service;

import com.example.back_end.dto.response.MyEnrolledCourseResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.InstructorProfile;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.repository.InstructorProfileRepository;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.LessonprogressRepository;
import com.example.back_end.repository.ReviewRepository;
import com.example.back_end.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Comparator;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final LessonRepository lessonRepository;
    private final ReviewRepository reviewRepository;
    private final LessonprogressRepository lessonprogressRepository;
    private final InstructorProfileRepository instructorProfileRepository;
    private final CourseRepository courseRepository;

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

        long totalLessons =
                lessonRepository.countBySectionCourseId(course.getId());

        long completedLessons =
                lessonprogressRepository.countCompletedLessonsByUserAndCourse(
                        enrollment.getUser().getId(),
                        course.getId()
                );

        long totalDurationSeconds =
                lessonRepository.sumDurationSecondsBySectionCourseId(course.getId());

        double averageRating =
                reviewRepository.getAverageRating(course.getId());

        long reviewCount =
                reviewRepository.countByCourseId(course.getId());
        long studentCount =
                enrollmentRepository.countByCourseId(course.getId());

        String categoryName = course.getCoursecategories().stream()
                .filter(cc -> Boolean.TRUE.equals(cc.getIsPrimary()))
                .findFirst()
                .map(cc -> cc.getCategory().getName())
                .orElse(null);

        List<String> tags = course.getTags().stream()
                .filter(tag -> !Boolean.TRUE.equals(tag.getIsDeleted()))
                .map(com.example.back_end.entity.Tag::getName)
                .sorted(Comparator.naturalOrder())
                .toList();

        Long instructorId = course.getInstructor().getId();

        InstructorProfile instructorProfile = instructorProfileRepository
                .findById(instructorId)
                .orElse(null);

        long instructorCourseCount =
                courseRepository.countByInstructorIdAndIsDeletedFalse(instructorId);
        long instructorStudentCount =
                enrollmentRepository.countDistinctStudentsByInstructorId(instructorId);
        double instructorRating =
                reviewRepository.getAverageRatingByInstructorId(instructorId);

        return new MyEnrolledCourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getWhatYouLearn(),
                categoryName,
                tags,

                course.getInstructor().getFullName(),
                course.getInstructor().getAvatar(),
                instructorProfile != null ? instructorProfile.getHeadline() : null,
                instructorProfile != null ? instructorProfile.getDescription() : null,
                instructorCourseCount,
                instructorStudentCount,
                instructorRating,

                course.getLevel(),

                course.getThumbnailKey(),

                enrollment.getProgressPercent(),

                (int) totalLessons,
                (int) completedLessons,
                totalDurationSeconds,
                averageRating,
                reviewCount,
                studentCount,

                enrollment.getEnrolledAt(),
                enrollment.getCompletedAt(),
                course.getUpdatedAt()
        );
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication == null ? null : authentication.getPrincipal();

        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails.getId();
        }

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Authentication required"
        );
    }
}