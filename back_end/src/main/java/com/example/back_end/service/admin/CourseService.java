package com.example.back_end.service.admin;

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
import java.time.Instant;
import java.time.OffsetDateTime;

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
        Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        return toResponse(course);
    }

    public CourseResponse createCourse(CourseRequest courseRequest) {
        Course course = new Course();
        applyRequestToCourse(course, courseRequest);
        course.setCreatedAt(Instant.now());
        course.setUpdatedAt(Instant.now());
        course.setIsDeleted(false);
        courseRepository.save(course);

        return toResponse(course);
    }

    public CourseResponse updateCourse(Long id, CourseRequest courseRequest) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        applyRequestToCourse(course, courseRequest);
        course.setUpdatedAt(Instant.now());

        courseRepository.save(course);

        return toResponse(course);
    }

    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));
        course.setIsDeleted(true);
        course.setUpdatedAt(Instant.now());
        courseRepository.save(course);
    }

    public CourseResponse restoreCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));
        course.setIsDeleted(false);
        course.setUpdatedAt(Instant.now());
        courseRepository.save(course);

        return toResponse(course);
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
                course.getStatus() == null ? null : course.getStatus().name(),
                course.getInstructor() == null ? null : course.getInstructor().getId(),
                course.getInstructor() == null
                        ? null
                        : (course.getInstructor().getFullName() == null
                                ? course.getInstructor().getEmail()
                                : course.getInstructor().getFullName()),
                course.getPublishedAt(),
                course.getIsDeleted()
        );
    }

    private void applyRequestToCourse(Course course, CourseRequest courseRequest) {
        CourseLevel level = parseCourseLevel(courseRequest.level());
        CourseStatus status = parseCourseStatus(courseRequest.status());
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
        course.setPublishedAt(status == CourseStatus.PUBLISHED ? OffsetDateTime.now() : null);
    }

    private CourseLevel parseCourseLevel(String value) {
        try {
            return CourseLevel.valueOf(value);
        } catch (Exception exception) {
            throw new RuntimeException("Invalid course level: " + value);
        }
    }

    private CourseStatus parseCourseStatus(String value) {
        try {
            return CourseStatus.valueOf(value);
        } catch (Exception exception) {
            throw new RuntimeException("Invalid course status: " + value);
        }
    }
}
