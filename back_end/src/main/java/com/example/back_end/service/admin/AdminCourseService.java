package com.example.back_end.service.admin;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back_end.dto.response.admin.AdminCourseResponse;
import com.example.back_end.dto.resquest.admin.AdminCourseRequest;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseLevel;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.repository.admin.AdminUserRepository;
import com.example.back_end.repository.admin.AdminCourseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminCourseService {

    private final AdminCourseRepository courseRepository;
    private final AdminUserRepository adminUserRepository;

    public AdminCourseService(
            AdminCourseRepository courseRepository,
            AdminUserRepository adminUserRepository) {
        this.courseRepository = courseRepository;
        this.adminUserRepository = adminUserRepository;
    }

    public List<AdminCourseResponse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(course -> {
                    Long instructorId = course.getInstructor() == null ? null : course.getInstructor().getId();
                    String instructorName = course.getInstructor() == null
                            ? null
                            : (course.getInstructor().getFullName() == null
                                    ? course.getInstructor().getEmail()
                                    : course.getInstructor().getFullName());
                    String level = course.getLevel() == null ? null : course.getLevel().name();
                    String status = Boolean.TRUE.equals(course.getIsDeleted())
                            ? "DELETED"
                            : (course.getStatus() == null ? null : course.getStatus().name());
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
                            course.getPublishedAt()
                    );
                })
                .collect(Collectors.toList());
    }

    public AdminCourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        Long instructorId = course.getInstructor() == null ? null : course.getInstructor().getId();
        String instructorName = course.getInstructor() == null
                ? null
                : (course.getInstructor().getFullName() == null
                        ? course.getInstructor().getEmail()
                        : course.getInstructor().getFullName());
        String level = course.getLevel() == null ? null : course.getLevel().name();
        String status = Boolean.TRUE.equals(course.getIsDeleted())
                ? "DELETED"
                : (course.getStatus() == null ? null : course.getStatus().name());

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
                course.getPublishedAt()
        );
    }

    public AdminCourseResponse createCourse(AdminCourseRequest courseRequest) {
        Course course = new Course();

        CourseLevel level;
        try {
            level = CourseLevel.valueOf(courseRequest.level());
        } catch (Exception exception) {
            throw new RuntimeException("Invalid course level: " + courseRequest.level());
        }

        CourseStatus status;
        if ("DELETED".equalsIgnoreCase(courseRequest.status())) {
            status = CourseStatus.ARCHIVED;
        } else {
            try {
                status = CourseStatus.valueOf(courseRequest.status());
            } catch (Exception exception) {
                throw new RuntimeException("Invalid course status: " + courseRequest.status());
            }
        }

        boolean deleted = Boolean.TRUE.equals(courseRequest.isDeleted())
                || "DELETED".equalsIgnoreCase(courseRequest.status());

        User instructor = adminUserRepository.findById(courseRequest.instructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found id=" + courseRequest.instructorId()));

        course.setThumbnailKey(courseRequest.thumbnailKey().trim());
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

        Course saved = courseRepository.save(course);

        Long instructorId = saved.getInstructor() == null ? null : saved.getInstructor().getId();
        String instructorName = saved.getInstructor() == null
                ? null
                : (saved.getInstructor().getFullName() == null
                        ? saved.getInstructor().getEmail()
                        : saved.getInstructor().getFullName());
        String savedLevel = saved.getLevel() == null ? null : saved.getLevel().name();
        String savedStatus = Boolean.TRUE.equals(saved.getIsDeleted())
                ? "DELETED"
                : (saved.getStatus() == null ? null : saved.getStatus().name());

        return new AdminCourseResponse(
                saved.getId(),
                saved.getThumbnailKey(),
                saved.getTitle(),
                saved.getSlug(),
                saved.getDescription(),
                saved.getLanguage(),
                saved.getRequirements(),
                saved.getWhatYouLearn(),
                saved.getBasePrice(),
                savedLevel,
                savedStatus,
                instructorId,
                instructorName,
                saved.getPublishedAt()
        );
    }

    public AdminCourseResponse updateCourse(Long id, AdminCourseRequest courseRequest) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        CourseLevel level;
        try {
            level = CourseLevel.valueOf(courseRequest.level());
        } catch (Exception exception) {
            throw new RuntimeException("Invalid course level: " + courseRequest.level());
        }

        CourseStatus status;
        if ("DELETED".equalsIgnoreCase(courseRequest.status())) {
            status = CourseStatus.ARCHIVED;
        } else {
            try {
                status = CourseStatus.valueOf(courseRequest.status());
            } catch (Exception exception) {
                throw new RuntimeException("Invalid course status: " + courseRequest.status());
            }
        }

        boolean deleted = Boolean.TRUE.equals(courseRequest.isDeleted())
                || "DELETED".equalsIgnoreCase(courseRequest.status());

        User instructor = adminUserRepository.findById(courseRequest.instructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found id=" + courseRequest.instructorId()));

        course.setThumbnailKey(courseRequest.thumbnailKey().trim());
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
        if (status != CourseStatus.PUBLISHED) {
            course.setPublishedAt(null);
        } else {
            course.setPublishedAt(course.getPublishedAt() == null ? OffsetDateTime.now() : course.getPublishedAt());
        }
        course.setIsDeleted(deleted);

        course.setUpdatedAt(Instant.now());
        Course updated = courseRepository.save(course);

        Long instructorId = updated.getInstructor() == null ? null : updated.getInstructor().getId();
        String instructorName = updated.getInstructor() == null
                ? null
                : (updated.getInstructor().getFullName() == null
                        ? updated.getInstructor().getEmail()
                        : updated.getInstructor().getFullName());
        String updatedLevel = updated.getLevel() == null ? null : updated.getLevel().name();
        String updatedStatus = Boolean.TRUE.equals(updated.getIsDeleted())
                ? "DELETED"
                : (updated.getStatus() == null ? null : updated.getStatus().name());

        return new AdminCourseResponse(
                updated.getId(),
                updated.getThumbnailKey(),
                updated.getTitle(),
                updated.getSlug(),
                updated.getDescription(),
                updated.getLanguage(),
                updated.getRequirements(),
                updated.getWhatYouLearn(),
                updated.getBasePrice(),
                updatedLevel,
                updatedStatus,
                instructorId,
                instructorName,
                updated.getPublishedAt()
        );
    }

    public AdminCourseResponse deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found id=" + id));

        course.setIsDeleted(true);
        course.setPublishedAt(null);
        if (course.getStatus() == CourseStatus.PUBLISHED) {
            course.setStatus(CourseStatus.ARCHIVED);
        }
        course.setUpdatedAt(Instant.now());

        Course deletedCourse = courseRepository.save(course);

        Long instructorId = deletedCourse.getInstructor() == null ? null : deletedCourse.getInstructor().getId();
        String instructorName = deletedCourse.getInstructor() == null
                ? null
                : (deletedCourse.getInstructor().getFullName() == null
                        ? deletedCourse.getInstructor().getEmail()
                        : deletedCourse.getInstructor().getFullName());
        String deletedLevel = deletedCourse.getLevel() == null ? null : deletedCourse.getLevel().name();
        String deletedStatus = Boolean.TRUE.equals(deletedCourse.getIsDeleted())
                ? "DELETED"
                : (deletedCourse.getStatus() == null ? null : deletedCourse.getStatus().name());

        return new AdminCourseResponse(
                deletedCourse.getId(),
                deletedCourse.getThumbnailKey(),
                deletedCourse.getTitle(),
                deletedCourse.getSlug(),
                deletedCourse.getDescription(),
                deletedCourse.getLanguage(),
                deletedCourse.getRequirements(),
                deletedCourse.getWhatYouLearn(),
                deletedCourse.getBasePrice(),
                deletedLevel,
                deletedStatus,
                instructorId,
                instructorName,
                deletedCourse.getPublishedAt()
        );
    }
}
