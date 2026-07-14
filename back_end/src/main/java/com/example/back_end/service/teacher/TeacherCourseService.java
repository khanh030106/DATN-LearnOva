package com.example.back_end.service.teacher;

import com.example.back_end.dto.request.CreateDraftCourseRequest;
import com.example.back_end.dto.request.UpdateCourseRequest;
import com.example.back_end.dto.response.teacher.TeacherCoursesResponse;
import com.example.back_end.dto.response.teacher.TeacherReviewResponse;
import com.example.back_end.dto.response.teacher.TeacherStudentCourseResponse;
import com.example.back_end.dto.response.teacher.TeacherStudentResponse;
import com.example.back_end.entity.Category;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Coursecategory;
import com.example.back_end.entity.CoursecategoryId;
import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.Review;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.entity.enums.NotificationType;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.CoursecategoryRepository;
import com.example.back_end.repository.EnrollmentRepository;
import com.example.back_end.repository.ReviewRepository;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.admin.AdminCategoryRepository;
import com.example.back_end.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TeacherCourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CoursecategoryRepository coursecategoryRepository;
    private final AdminCategoryRepository categoryRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ReviewRepository reviewRepository;
    private final NotificationService notificationService;

    private static final Set<CourseStatus> TEACHER_SETTABLE_STATUSES = EnumSet.of(CourseStatus.DRAFT, CourseStatus.PENDING_REVIEW);

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
        course.setIsHidden(false);
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

        if (!TEACHER_SETTABLE_STATUSES.contains(newStatus)) {
            throw new BusinessException("You can only save as draft or submit for review. Publishing requires admin approval.");
        }

        course.setStatus(newStatus);
        course.setUpdatedAt(Instant.now());

        if (newStatus == CourseStatus.PENDING_REVIEW) {
            course.setRejectionReason(null);
            notificationService.createForAll(
                    userRepository.findAllAdmins(),
                    NotificationType.COURSE_SUBMITTED,
                    "New course submitted for review",
                    course.getInstructor().getFullName() + " submitted \"" + course.getTitle() + "\" for review.",
                    "/learnova/admin/course-approval/" + course.getId(),
                    Map.of("courseId", course.getId(), "courseTitle", course.getTitle())
            );
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

        Map<Long, ReviewRepository.CourseRatingProjection> ratingByCourseId = reviewRepository
                .findAvgRatingByCourseForInstructor(instructor.getId())
                .stream()
                .collect(Collectors.toMap(ReviewRepository.CourseRatingProjection::getCourseId, r -> r));

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

                    ReviewRepository.CourseRatingProjection rating = ratingByCourseId.get(course.getId());
                    double avgRating = rating != null && rating.getAvgRating() != null ? rating.getAvgRating() : 0;
                    long ratingCount = rating != null && rating.getRatingCount() != null ? rating.getRatingCount() : 0;

                    return new TeacherCoursesResponse(
                            course.getId(),
                            course.getTitle(),
                            course.getThumbnailKey(),
                            course.getStatus(),
                            course.getBasePrice(),
                            course.getCreatedAt(),
                            course.getUpdatedAt(),
                            categoryName,
                            lessonCount,
                            totalDurationSeconds,
                            studentCount,
                            course.getIsDeleted(),
                            course.getIsHidden(),
                            course.getRejectionReason(),
                            avgRating,
                            ratingCount
                    );
                })
                .toList();
    }

    public void updateCourse(Long courseId, UpdateCourseRequest request, String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new BusinessException("You don't have permission to modify this course");
        }

        course.setTitle(request.title());
        course.setDescription(request.description());
        course.setLanguage(request.language());
        course.setLevel(request.level());
        course.setBasePrice(request.basePrice());
        course.setThumbnailKey(request.thumbnailKey());
        course.setRequirements(request.requirements());
        course.setWhatYouLearn(request.whatYouLearn());
        course.setUpdatedAt(Instant.now());
        courseRepository.save(course);

        if (request.categoryId() != null) {
            coursecategoryRepository.deleteByCourseId(courseId);

            Category category = categoryRepository.findActiveById(request.categoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

            CoursecategoryId ccId = new CoursecategoryId();
            ccId.setCourseId(courseId);
            ccId.setCategoryId(category.getId());

            Coursecategory cc = new Coursecategory();
            cc.setId(ccId);
            cc.setCourse(course);
            cc.setCategory(category);
            cc.setIsPrimary(true);

            coursecategoryRepository.save(cc);
        }
    }

    public void softDeleteCourse(Long courseId, String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new BusinessException("You don't have permission to delete this course");
        }

        course.setIsDeleted(true);
        course.setUpdatedAt(Instant.now());
        courseRepository.save(course);
    }

    public boolean toggleCourseVisibility(Long courseId, String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new BusinessException("You don't have permission to modify this course");
        }

        boolean newHiddenState = !Boolean.TRUE.equals(course.getIsHidden());
        course.setIsHidden(newHiddenState);
        course.setUpdatedAt(Instant.now());
        courseRepository.save(course);
        return newHiddenState;
    }

    @Transactional(readOnly = true)
    public List<TeacherStudentResponse> getMyStudents(String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Enrollment> enrollments = enrollmentRepository.findByInstructorId(instructor.getId());

        // Group enrollments by student, preserving earliest enrolledAt
        Map<Long, List<Enrollment>> byStudent = enrollments.stream()
                .collect(Collectors.groupingBy(e -> e.getUser().getId()));

        return byStudent.entrySet().stream()
                .map(entry -> {
                    List<Enrollment> studentEnrollments = entry.getValue();
                    User student = studentEnrollments.get(0).getUser();

                    List<TeacherStudentCourseResponse> courses = studentEnrollments.stream()
                            .map(e -> new TeacherStudentCourseResponse(
                                    e.getCourse().getId(),
                                    e.getCourse().getTitle(),
                                    e.getProgressPercent() != null ? e.getProgressPercent() : 0,
                                    e.getEnrolledAt()
                            ))
                            .toList();

                    Instant earliestEnrolledAt = studentEnrollments.stream()
                            .map(Enrollment::getEnrolledAt)
                            .min(Comparator.naturalOrder())
                            .orElse(null);

                    int avgProgress = (int) studentEnrollments.stream()
                            .mapToInt(e -> e.getProgressPercent() != null ? e.getProgressPercent() : 0)
                            .average()
                            .orElse(0);

                    String status = avgProgress == 0 ? "NOT_STARTED"
                            : avgProgress == 100 ? "COMPLETED"
                            : "IN_PROGRESS";

                    return new TeacherStudentResponse(
                            student.getId(),
                            student.getFullName(),
                            student.getEmail(),
                            student.getPhone(),
                            student.getAvatar(),
                            courses,
                            earliestEnrolledAt,
                            avgProgress,
                            status
                    );
                })
                .sorted(Comparator.comparing(
                        TeacherStudentResponse::enrolledAt,
                        Comparator.nullsLast(Comparator.reverseOrder())
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TeacherReviewResponse> getMyReviews(String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Long> courseIds = courseRepository
                .findByInstructorIdAndIsDeletedFalseOrderByCreatedAtDesc(instructor.getId())
                .stream()
                .map(Course::getId)
                .toList();

        if (courseIds.isEmpty()) {
            return List.of();
        }

        return reviewRepository.findByCourseIdInWithUserAndCourse(courseIds)
                .stream()
                .map(review -> new TeacherReviewResponse(
                        review.getId(),
                        review.getCourse().getId(),
                        review.getCourse().getTitle(),
                        review.getUser().getId(),
                        review.getUser().getFullName(),
                        review.getUser().getAvatar(),
                        review.getRating(),
                        review.getComment(),
                        review.getInstructorReply(),
                        review.getRepliedAt(),
                        review.getCreatedAt(),
                        review.getUpdatedAt()
                ))
                .toList();
    }

    public void replyToReview(Long reviewId, String email, String reply) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        if (!review.getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new BusinessException("You don't have permission to reply to this review");
        }

        review.setInstructorReply(reply);
        review.setRepliedAt(OffsetDateTime.now());
        reviewRepository.save(review);
    }
}
