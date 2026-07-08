package com.example.back_end.service;

import com.example.back_end.dto.response.CourseCurriculumResponse;
import com.example.back_end.dto.response.LessonResponse;
import com.example.back_end.dto.response.SectionResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.Section;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.LessonprogressRepository;
import com.example.back_end.repository.SectionRepository;
import com.example.back_end.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.repository.EnrollmentRepository;
import java.util.List;
import com.example.back_end.entity.InstructorProfile;
import com.example.back_end.repository.InstructorProfileRepository;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CourseCurriculumService {

    private final CourseRepository courseRepository;
    private final SectionRepository sectionRepository;
    private final LessonRepository lessonRepository;
    private final LessonprogressRepository lessonprogressRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final InstructorProfileRepository instructorProfileRepository;

    @Transactional(readOnly = true)
    public CourseCurriculumResponse getCourseCurriculum(Long courseId) {

        Long userId = getCurrentUserId();

        Course course = courseRepository.findCourseDetailById(courseId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        InstructorProfile profile = instructorProfileRepository
                .findById(course.getInstructor().getId())
                .orElse(null);

        List<String> expertise = List.of();

        if (profile != null && profile.getExpertise() != null) {
            expertise = List.of(profile.getExpertise().split(","))
                    .stream()
                    .map(String::trim)
                    .toList();
        }

        List<Section> sections =
                sectionRepository.findByCourseIdOrderBySectionOrderAsc(courseId);

        List<SectionResponse> curriculum = sections.stream()
                .map(section -> {

                    List<Lesson> lessons =
                            lessonRepository.findBySectionIdOrderByLessonOrderAsc(section.getId());

                    List<LessonResponse> lessonResponses = lessons.stream()
                            .map(lesson -> {

                                boolean completed =
                                        lessonprogressRepository
                                                .existsByUser_IdAndLesson_IdAndIsCompletedTrue(
                                                        userId,
                                                        lesson.getId()
                                                );

                                String duration = formatDuration(lesson.getDurationSeconds());

                                return new LessonResponse(
                                        lesson.getId(),
                                        lesson.getTitle(),
                                        duration,
                                        completed
                                );

                            })
                            .toList();

                    int totalLessons = lessonResponses.size();

                    int completedLessons = (int) lessonResponses.stream()
                            .filter(LessonResponse::completed)
                            .count();

                    int percent = totalLessons == 0
                            ? 0
                            : completedLessons * 100 / totalLessons;

                    return new SectionResponse(
                            section.getId(),
                            section.getTitle(),
                            completedLessons,
                            totalLessons,
                            percent,
                            lessonResponses
                    );

                })
                .toList();

        int totalLessons = curriculum.stream()
                .mapToInt(SectionResponse::totalLessons)
                .sum();
        List<String> categories = course.getCoursecategories()
                .stream()
                .map(courseCategory -> courseCategory.getCategory().getName())
                .toList();

        int totalDurationSeconds = sections.stream()
                .flatMap(section ->
                        lessonRepository
                                .findBySectionIdOrderByLessonOrderAsc(section.getId())
                                .stream()
                )
                .map(Lesson::getDurationSeconds)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();

        String duration = formatCourseDuration(totalDurationSeconds);


        String updatedAt = DateTimeFormatter
                .ofPattern("MM/yyyy")
                .withZone(ZoneId.systemDefault())
                .format(course.getUpdatedAt());

        return new CourseCurriculumResponse(
                course.getId(),
                course.getTitle(),
                curriculum.size(),
                totalLessons,
                curriculum,
                categories,
                course.getWhatYouLearn(),
                course.getDescription(),
                duration,
                updatedAt
        );
    }

    private String formatDuration(Integer seconds) {

        if (seconds == null) {
            return "00:00";
        }

        int minutes = seconds / 60;
        int remainSeconds = seconds % 60;

        return String.format("%02d:%02d", minutes, remainSeconds);
    }
    private String formatCourseDuration(int seconds) {

        int hours = seconds / 3600;
        int minutes = (seconds % 3600) / 60;

        return String.format("%dh %02dm", hours, minutes);
    }

    private Long getCurrentUserId() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Object principal =
                authentication == null ? null : authentication.getPrincipal();

        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails.getId();
        }

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Authentication required"
        );
    }
    @Transactional
    public void restartCourse(Long courseId) {
        Long userId = getCurrentUserId();

        Enrollment enrollment = enrollmentRepository
                .findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setProgressPercent(0);
        enrollment.setCompletedAt(null);

        enrollmentRepository.save(enrollment);
        lessonprogressRepository.resetCourseProgress(userId, courseId);
    }
}