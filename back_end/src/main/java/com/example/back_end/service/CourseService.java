package com.example.back_end.service;

import com.example.back_end.dto.response.CourseDetailResponse;
import com.example.back_end.dto.response.FeaturedCourseResponse;
import com.example.back_end.dto.response.PublicCourseResponse;
import com.example.back_end.dto.response.TeacherCoursesResponse;
import com.example.back_end.dto.resquest.CreateDraftCourseRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Coursecategory;
import com.example.back_end.entity.CoursecategoryId;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.CoursecategoryRepository;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.admin.AdminCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CoursecategoryRepository coursecategoryRepository;
    private final AdminCategoryRepository categoryRepository;
    private final EnrollmentRepository enrollmentRepository;

    public Long createDraftCourse(CreateDraftCourseRequest request, String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = new Course();

        course.setTitle(request.title());
        course.setDescription(request.description());
        course.setLanguage(request.language());
        course.setLevel(request.level());
        course.setBasePrice(request.basePrice());
        course.setRequirements(request.requirements());
        course.setWhatYouLearn(request.whatYouLearn());
        course.setThumbnailKey(request.thumbnailKey());
        course.setStatus(CourseStatus.DRAFT);
        course.setInstructor(instructor);
        course.setIsDeleted(false);
        course.setSlug(UUID.randomUUID().toString());
        course.setCreatedAt(Instant.now());
        course.setUpdatedAt(Instant.now());

        courseRepository.save(course);

        if (request.categoryId() != null) {
            Category category = categoryRepository.findActiveById(request.categoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

            CoursecategoryId ccId = new CoursecategoryId();
            ccId.setCourseId(course.getId());
            ccId.setCategoryId(category.getId());

            Coursecategory cc = new Coursecategory();
            cc.setId(ccId);
            cc.setCourse(course);
            cc.setCategory(category);
            cc.setIsPrimary(true);

            coursecategoryRepository.save(cc);
        }

        return course.getId();
    }

    public void updateCourseStatus(Long courseId, String email, String status) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new BusinessException("You don't have permission to modify this course");
        }

        CourseStatus newStatus;
        try {
            newStatus = CourseStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessException("Invalid course status: " + status);
        }

        course.setStatus(newStatus);
        course.setUpdatedAt(Instant.now());

        if (newStatus == CourseStatus.PUBLISHED && course.getPublishedAt() == null) {
            course.setPublishedAt(OffsetDateTime.now());
        }

        courseRepository.save(course);
    }

    public List<TeacherCoursesResponse> getMyCourses(String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Course> courses = courseRepository
                .findByInstructorIdAndIsDeletedFalseOrderByCreatedAtDesc(instructor.getId());

        List<Long> courseIds = courses.stream()
                .map(Course::getId)
                .toList();

        Map<Long, Long> enrollmentCountByCourseId = courseIds.isEmpty()
                ? Map.of()
                : enrollmentRepository.findByCourseIdIn(courseIds)
                .stream()
                .collect(Collectors.groupingBy(e -> e.getCourse().getId(), Collectors.counting()));

        return courses.stream()
                .map(course -> {
                    String categoryName = course.getCoursecategories().stream()
                            .filter(cc -> Boolean.TRUE.equals(cc.getIsPrimary()))
                            .findFirst()
                            .map(cc -> cc.getCategory().getName())
                            .orElse(null);

                    var activeLessons = course.getSections().stream()
                            .filter(s -> !Boolean.TRUE.equals(s.getIsDeleted()))
                            .flatMap(s -> s.getLessons().stream())
                            .filter(l -> !Boolean.TRUE.equals(l.getIsDeleted()))
                            .toList();

                    long lessonCount = activeLessons.size();

                    long totalDurationSeconds = activeLessons.stream()
                            .mapToLong(l -> l.getDurationSeconds() != null ? l.getDurationSeconds() : 0)
                            .sum();

                    long studentCount = enrollmentCountByCourseId.getOrDefault(course.getId(), 0L);

                    return new TeacherCoursesResponse(
                            course.getId(),
                            course.getTitle(),
                            course.getThumbnailKey(),
                            course.getStatus(),
                            course.getBasePrice(),
                            course.getCreatedAt(),
                            categoryName,
                            lessonCount,
                            totalDurationSeconds,
                            studentCount
                    );
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseDetailResponse getCourseDetail(Long courseId) {
        Course course = courseRepository.findCourseDetailById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        String categoryName = course.getCoursecategories().stream()
                .filter(cc -> Boolean.TRUE.equals(cc.getIsPrimary()))
                .findFirst()
                .map(cc -> cc.getCategory().getName())
                .orElse(null);

        List<CourseDetailResponse.SectionInfo> sections = course.getSections().stream()
                .filter(s -> !Boolean.TRUE.equals(s.getIsDeleted()))
                .sorted(Comparator.comparingDouble(s -> s.getSectionOrder() != null ? s.getSectionOrder() : 0.0))
                .map(s -> {
                    List<CourseDetailResponse.LessonInfo> lessons = s.getLessons().stream()
                            .filter(l -> !Boolean.TRUE.equals(l.getIsDeleted()))
                            .sorted(Comparator.comparingDouble(l -> l.getLessonOrder() != null ? l.getLessonOrder() : 0.0))
                            .map(l -> new CourseDetailResponse.LessonInfo(
                                    l.getId(),
                                    l.getTitle(),
                                    l.getLessonOrder(),
                                    l.getDurationSeconds(),
                                    l.getVideoKey(),
                                    l.getIsPreview()
                            ))
                            .toList();

                    return new CourseDetailResponse.SectionInfo(
                            s.getId(),
                            s.getTitle(),
                            s.getSectionOrder(),
                            lessons
                    );
                })
                .toList();

        long lessonCount = sections.stream()
                .mapToLong(s -> s.lessons().size())
                .sum();

        long totalDurationSeconds = sections.stream()
                .flatMap(s -> s.lessons().stream())
                .mapToLong(l -> l.durationSeconds() != null ? l.durationSeconds() : 0)
                .sum();

        User instructor = course.getInstructor();

        CourseDetailResponse.InstructorInfo instructorInfo =
                new CourseDetailResponse.InstructorInfo(
                        instructor.getId(),
                        instructor.getFullName(),
                        instructor.getAvatar()
                );

        return new CourseDetailResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getThumbnailKey(),
                course.getBasePrice(),
                course.getLevel(),
                course.getLanguage(),
                course.getRequirements(),
                course.getWhatYouLearn(),
                categoryName,
                lessonCount,
                totalDurationSeconds,
                instructorInfo,
                sections
        );
    }

    @Transactional(readOnly = true)
    public List<FeaturedCourseResponse> getFeaturedCourses() {
        List<Course> published = courseRepository.findAllByStatus(CourseStatus.PUBLISHED);

        List<Long> courseIds = published.stream()
                .map(Course::getId)
                .toList();

        Map<Long, Long> enrollmentCountByCourseId = courseIds.isEmpty()
                ? Map.of()
                : enrollmentRepository.findByCourseIdIn(courseIds)
                .stream()
                .collect(Collectors.groupingBy(e -> e.getCourse().getId(), Collectors.counting()));

        return published.stream()
                .sorted((a, b) -> Long.compare(
                        enrollmentCountByCourseId.getOrDefault(b.getId(), 0L),
                        enrollmentCountByCourseId.getOrDefault(a.getId(), 0L)
                ))
                .limit(8)
                .map(course -> {
                    String categoryName = course.getCoursecategories().stream()
                            .filter(cc -> Boolean.TRUE.equals(cc.getIsPrimary()))
                            .findFirst()
                            .map(cc -> cc.getCategory().getName())
                            .orElse(null);

                    var activeLessons = course.getSections().stream()
                            .filter(s -> !Boolean.TRUE.equals(s.getIsDeleted()))
                            .flatMap(s -> s.getLessons().stream())
                            .filter(l -> !Boolean.TRUE.equals(l.getIsDeleted()))
                            .toList();

                    long lessonCount = activeLessons.size();

                    long totalDurationSeconds = activeLessons.stream()
                            .mapToLong(l -> l.getDurationSeconds() != null ? l.getDurationSeconds() : 0)
                            .sum();

                    long studentCount = enrollmentCountByCourseId.getOrDefault(course.getId(), 0L);

                    return new FeaturedCourseResponse(
                            course.getId(),
                            course.getTitle(),
                            course.getThumbnailKey(),
                            course.getInstructor().getFullName(),
                            course.getBasePrice(),
                            studentCount,
                            lessonCount,
                            totalDurationSeconds,
                            categoryName,
                            course.getLevel(),
                            0.0
                    );
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PublicCourseResponse> getPublishedCourses() {
        return courseRepository
                .findByStatusAndIsDeletedFalseOrderByCreatedAtDesc(CourseStatus.PUBLISHED)
                .stream()
                .map(this::toPublicCourseResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PublicCourseResponse getPublishedCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .filter(item -> item.getStatus() == CourseStatus.PUBLISHED)
                .filter(item -> !Boolean.TRUE.equals(item.getIsDeleted()))
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        return toPublicCourseResponse(course);
    }

    private PublicCourseResponse toPublicCourseResponse(Course course) {
        return new PublicCourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getInstructor().getFullName(),
                course.getBasePrice(),
                course.getLevel(),
                course.getStatus(),
                course.getThumbnailKey()
        );
    }
}