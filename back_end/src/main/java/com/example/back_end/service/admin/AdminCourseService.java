package com.example.back_end.service.admin;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back_end.dto.response.admin.AdminCourseResponse;
import com.example.back_end.dto.resquest.admin.AdminCourseRequest;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Tag;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseLevel;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.admin.AdminUserRepository;
import com.example.back_end.repository.admin.AdminCourseRepository;
import com.example.back_end.repository.admin.AdminTagRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminCourseService {

    private final AdminCourseRepository courseRepository;
    private final AdminUserRepository adminUserRepository;
    private final AdminTagRepository tagRepository;

    public AdminCourseService(
            AdminCourseRepository courseRepository,
            AdminUserRepository adminUserRepository,
            AdminTagRepository tagRepository) {
        this.courseRepository = courseRepository;
        this.adminUserRepository = adminUserRepository;
        this.tagRepository = tagRepository;
    }

    public List<AdminCourseResponse> getAllCourses() {
        return courseRepository.findAllWithInstructor().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AdminCourseResponse getCourseById(Long id) {
        Course course = courseRepository.findByIdWithInstructor(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found id=" + id));
        return toResponse(course);
    }

    public AdminCourseResponse createCourse(AdminCourseRequest request) {
        CourseLevel level = parseCourseLevel(request.level());
        CourseStatus status = parseCourseStatus(request.status());
        boolean deleted = Boolean.TRUE.equals(request.isDeleted())
                || "DELETED".equalsIgnoreCase(request.status());

        User instructor = adminUserRepository.findById(request.instructorId())
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found id=" + request.instructorId()));

        Course course = new Course();
        course.setThumbnailKey(request.thumbnailKey().trim());
        course.setTitle(request.title().trim());
        course.setSlug(request.slug().trim());
        course.setDescription(request.description().trim());
        course.setLanguage(blankToDefault(request.language(), "vi"));
        course.setRequirements(request.requirements());
        course.setWhatYouLearn(request.whatYouLearn());
        course.setBasePrice(request.basePrice());
        course.setLevel(level);
        course.setStatus(status);
        course.setInstructor(instructor);
        course.setPublishedAt(!deleted && status == CourseStatus.PUBLISHED ? OffsetDateTime.now() : null);
        course.setCreatedAt(Instant.now());
        course.setUpdatedAt(Instant.now());
        course.setIsDeleted(deleted);
        course.setTags(loadTags(request.tagIds()));

        return toResponse(courseRepository.save(course));
    }

    public AdminCourseResponse updateCourse(Long id, AdminCourseRequest request) {
        Course course = courseRepository.findByIdWithInstructor(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found id=" + id));

        CourseLevel level = parseCourseLevel(request.level());
        CourseStatus status = parseCourseStatus(request.status());
        boolean deleted = Boolean.TRUE.equals(request.isDeleted())
                || "DELETED".equalsIgnoreCase(request.status());

        User instructor = adminUserRepository.findById(request.instructorId())
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found id=" + request.instructorId()));

        course.setThumbnailKey(request.thumbnailKey().trim());
        course.setTitle(request.title().trim());
        course.setSlug(request.slug().trim());
        course.setDescription(request.description().trim());
        course.setLanguage(blankToDefault(request.language(), "vi"));
        course.setRequirements(request.requirements());
        course.setWhatYouLearn(request.whatYouLearn());
        course.setBasePrice(request.basePrice());
        course.setLevel(level);
        course.setStatus(status);
        course.setInstructor(instructor);
        course.setIsDeleted(deleted);
        course.setTags(loadTags(request.tagIds()));
        course.setUpdatedAt(Instant.now());

        if (status != CourseStatus.PUBLISHED) {
            course.setPublishedAt(null);
        } else {
            course.setPublishedAt(course.getPublishedAt() == null ? OffsetDateTime.now() : course.getPublishedAt());
        }

        return toResponse(courseRepository.save(course));
    }

    public AdminCourseResponse deleteCourse(Long id) {
        Course course = courseRepository.findByIdWithInstructor(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found id=" + id));

        course.setIsDeleted(true);
        course.setPublishedAt(null);
        if (course.getStatus() == CourseStatus.PUBLISHED) {
            course.setStatus(CourseStatus.ARCHIVED);
        }
        course.setUpdatedAt(Instant.now());

        return toResponse(courseRepository.save(course));
    }

    // ── helpers ────────────────────────────────────────────────────────────────

    private AdminCourseResponse toResponse(Course course) {
        Long instructorId = course.getInstructor() == null ? null : course.getInstructor().getId();
        String instructorName = course.getInstructor() == null ? null
                : (course.getInstructor().getFullName() == null
                        ? course.getInstructor().getEmail()
                        : course.getInstructor().getFullName());
        String level = course.getLevel() == null ? null : course.getLevel().name();
        String status = Boolean.TRUE.equals(course.getIsDeleted()) ? "DELETED"
                : (course.getStatus() == null ? null : course.getStatus().name());
        List<Long> tagIds = course.getTags().stream()
                .map(Tag::getId)
                .collect(Collectors.toList());

        return new AdminCourseResponse(
                course.getId(),
                course.getThumbnailKey(),
                course.getTitle(),
                course.getSlug(),
                course.getDescription(),
                course.getLanguage(),
                course.getRequirements(),
                course.getWhatYouLearn(),
                course.getBasePrice(),
                level,
                status,
                instructorId,
                instructorName,
                course.getPublishedAt(),
                tagIds
        );
    }

    private Set<Tag> loadTags(List<Long> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) return new LinkedHashSet<>();
        return new LinkedHashSet<>(tagRepository.findByIdIn(tagIds));
    }

    private CourseLevel parseCourseLevel(String value) {
        try {
            return CourseLevel.valueOf(value);
        } catch (Exception e) {
            throw new BusinessException("Invalid course level: " + value);
        }
    }

    private CourseStatus parseCourseStatus(String value) {
        if ("DELETED".equalsIgnoreCase(value)) return CourseStatus.ARCHIVED;
        try {
            return CourseStatus.valueOf(value);
        } catch (Exception e) {
            throw new BusinessException("Invalid course status: " + value);
        }
    }

    private String blankToDefault(String value, String defaultValue) {
        return (value == null || value.isBlank()) ? defaultValue : value.trim();
    }
}
