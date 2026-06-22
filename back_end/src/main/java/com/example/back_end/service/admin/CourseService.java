package com.example.back_end.service.admin;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back_end.dto.response.admin.CourseResponse;
import com.example.back_end.dto.resquest.admin.CourseRequest;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseLevel;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.admin.CourseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        return toResponse(course);
    }

    public CourseResponse createCourse(CourseRequest courseRequest) {
        Course course = new Course();

        CourseLevel level = parseCourseLevel(courseRequest.level());
        CourseStatus status = parsePersistedStatus(courseRequest.status());
        boolean deleted = isDeletedRequest(courseRequest);

        User instructor = userRepository.findById(courseRequest.instructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found id=" + courseRequest.instructorId()));

        course.setThumbnailUrl(courseRequest.thumbnailUrl().trim());
        course.setTitle(courseRequest.title().trim());
        course.setSlug(courseRequest.slug().trim());
        course.setDescription(courseRequest.description().trim());
        course.setLanguage(courseRequest.language() == null || courseRequest.language().isBlank()
                ? "vi"
                : courseRequest.language().trim());
        course.setRequirements(courseRequest.requirements());
        course.setWhatYouLearn(courseRequest.whatYouLearn());
        course.setBasePrice(courseRequest.basePrice());
        course.setLevel(level);
        course.setStatus(status);
        course.setInstructor(instructor);
        course.setPublishedAt(!deleted && status == CourseStatus.PUBLISHED ? OffsetDateTime.now() : null);
        course.setCreatedAt(Instant.now());
        course.setUpdatedAt(Instant.now());
        course.setIsDeleted(deleted);

        courseRepository.save(course);

        return toResponse(course);
    }

    public CourseResponse updateCourse(Long id, CourseRequest courseRequest) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        CourseLevel level = parseCourseLevel(courseRequest.level());
        CourseStatus status = parsePersistedStatus(courseRequest.status());
        boolean deleted = isDeletedRequest(courseRequest);

        User instructor = userRepository.findById(courseRequest.instructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found id=" + courseRequest.instructorId()));

        course.setThumbnailUrl(courseRequest.thumbnailUrl().trim());
        course.setTitle(courseRequest.title().trim());
        course.setSlug(courseRequest.slug().trim());
        course.setDescription(courseRequest.description().trim());
        course.setLanguage(courseRequest.language() == null || courseRequest.language().isBlank()
                ? "vi"
                : courseRequest.language().trim());
        course.setRequirements(courseRequest.requirements());
        course.setWhatYouLearn(courseRequest.whatYouLearn());
        course.setBasePrice(courseRequest.basePrice());
        course.setLevel(level);
        course.setStatus(status);
        course.setInstructor(instructor);
        course.setPublishedAt(deleted ? null : resolvePublishedAt(course, status));
        course.setIsDeleted(deleted);

        course.setUpdatedAt(Instant.now());
        courseRepository.save(course);

        return toResponse(course);
    }

    private OffsetDateTime resolvePublishedAt(Course course, CourseStatus nextStatus) {
        if (nextStatus != CourseStatus.PUBLISHED) {
            return null;
        }

        return course.getPublishedAt() == null ? OffsetDateTime.now() : course.getPublishedAt();
    }

    private CourseLevel parseCourseLevel(String value) {
        try {
            return CourseLevel.valueOf(value);
        } catch (Exception exception) {
            throw new RuntimeException("Invalid course level: " + value);
        }
    }

    private CourseStatus parsePersistedStatus(String value) {
        if ("DELETED".equalsIgnoreCase(value)) {
            return CourseStatus.ARCHIVED;
        }

        try {
            return CourseStatus.valueOf(value);
        } catch (Exception exception) {
            throw new RuntimeException("Invalid course status: " + value);
        }
    }

    private boolean isDeletedRequest(CourseRequest courseRequest) {
        return Boolean.TRUE.equals(courseRequest.isDeleted())
                || "DELETED".equalsIgnoreCase(courseRequest.status());
    }

    public CourseResponse deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        course.setIsDeleted(true);
        course.setPublishedAt(null);
        if (course.getStatus() == CourseStatus.PUBLISHED) {
            course.setStatus(CourseStatus.ARCHIVED);
        }
        course.setUpdatedAt(Instant.now());

        Course deletedCourse = courseRepository.save(course);
        return toResponse(deletedCourse);
    }

    private CourseResponse toResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getThumbnailUrl(),
                course.getTitle(),
                course.getSlug(),
                course.getDescription(),
                course.getLanguage(),
                course.getRequirements(),
                course.getWhatYouLearn(),
                course.getBasePrice(),
                course.getLevel() == null ? null : course.getLevel().name(),
                Boolean.TRUE.equals(course.getIsDeleted())
                        ? "DELETED"
                        : (course.getStatus() == null ? null : course.getStatus().name()),
                course.getInstructor() == null ? null : course.getInstructor().getId(),
                course.getInstructor() == null
                        ? null
                        : (course.getInstructor().getFullName() == null
                                ? course.getInstructor().getEmail()
                                : course.getInstructor().getFullName()),
                course.getPublishedAt()
        );
    }
}
