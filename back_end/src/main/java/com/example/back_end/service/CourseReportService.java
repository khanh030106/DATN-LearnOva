package com.example.back_end.service;

import com.example.back_end.dto.request.CreateCourseReportRequest;
import com.example.back_end.dto.response.CourseReportResponse;
import com.example.back_end.dto.response.CourseReportStatsResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.Notification;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.NotificationType;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.NotificationRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Course reports reuse existing {@code notifications} (type COURSE_REPORTED + metadata).
 * No new table / entity / Flyway migration.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class CourseReportService {

    private static final Set<String> ALLOWED_REASONS = Set.of(
            "MISLEADING_CONTENT",
            "SENSITIVE_CONTENT",
            "SPAM",
            "COPYRIGHT",
            "OTHER"
    );
    /** High-severity reasons: admin may soft-delete the reported lesson after a repeat report. */
    private static final Set<String> HIGH_SEVERITY_REASONS = Set.of(
            "SENSITIVE_CONTENT",
            "COPYRIGHT"
    );
    private static final Set<String> OPEN_STATUSES = Set.of("PENDING", "REVIEWING");
    private static final Set<String> CLOSED_STATUSES = Set.of("RESOLVED", "DISMISSED");
    private static final long REPEAT_THRESHOLD_FOR_DELETE = 2L;

    private final NotificationRepository notificationRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public CourseReportResponse create(Long reporterId, CreateCourseReportRequest request) {
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found id=" + request.courseId()));

        if (course.getInstructor() != null
                && Objects.equals(course.getInstructor().getId(), reporterId)) {
            throw new BusinessException("You cannot report your own course.");
        }

        String reason = request.reason() == null ? "" : request.reason().trim().toUpperCase();
        if (!ALLOWED_REASONS.contains(reason)) {
            throw new BusinessException("Invalid report reason.");
        }
        if ("OTHER".equals(reason) && (request.description() == null || request.description().isBlank())) {
            throw new BusinessException("Description is required when reason is OTHER.");
        }

        if (hasPendingReport(reporterId, course.getId())) {
            throw new BusinessException("You already have a pending report for this course.");
        }

        Lesson lesson = null;
        if (request.lessonId() != null) {
            lesson = lessonRepository.findById(request.lessonId())
                    .orElseThrow(() -> new ResourceNotFoundException("Lesson not found id=" + request.lessonId()));
        }

        String reportKey = UUID.randomUUID().toString();
        String reporterName = reporter.getFullName() != null ? reporter.getFullName() : reporter.getEmail();

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("reportKey", reportKey);
        metadata.put("courseId", course.getId());
        metadata.put("courseTitle", course.getTitle());
        metadata.put("courseHidden", Boolean.TRUE.equals(course.getIsHidden()));
        metadata.put("lessonId", lesson != null ? lesson.getId() : null);
        metadata.put("lessonTitle", lesson != null ? lesson.getTitle() : null);
        metadata.put("reporterId", reporter.getId());
        metadata.put("reporterName", reporterName);
        metadata.put("reason", reason);
        metadata.put("severity", severityOf(reason));
        metadata.put("description", request.description());
        metadata.put("status", "PENDING");
        metadata.put("adminNote", null);
        metadata.put("resolvedAt", null);
        boolean alreadyWarned = findMatchingCourseReasonReports(
                course.getId(),
                reason,
                lesson != null ? lesson.getId() : null
        ).stream().anyMatch(n -> Boolean.TRUE.equals(
                n.getMetadata() != null ? n.getMetadata().get("instructorWarned") : null
        ));
        metadata.put("instructorWarned", alreadyWarned);
        metadata.put("lessonDeleted", false);

        List<User> admins = userRepository.findAllAdmins();
        if (admins.isEmpty()) {
            throw new BusinessException("No admin available to receive the report.");
        }

        notificationService.createForAll(
                admins,
                NotificationType.COURSE_REPORTED,
                "Có báo cáo khóa học mới",
                "Khóa \"" + course.getTitle() + "\" bị báo cáo vì: "
                        + switch (reason) {
                            case "MISLEADING_CONTENT" -> "nội dung sai / gây hiểu nhầm";
                            case "SENSITIVE_CONTENT" -> "nội dung nhạy cảm / không phù hợp";
                            case "SPAM" -> "spam / quảng cáo";
                            case "COPYRIGHT" -> "vi phạm bản quyền";
                            case "OTHER" -> "lý do khác";
                            default -> reason;
                        },
                "/learnova/admin/violation-reports?id=" + reportKey,
                metadata
        );

        Notification seed = findByReportKey(reportKey).stream()
                .findFirst()
                .orElseThrow(() -> new BusinessException("Failed to create report notification."));

        return reloadResponse(seed.getId());

    }

    @Transactional(readOnly = true)
    public List<CourseReportResponse> listAll() {
        List<Notification> unique = loadUniqueReports();
        Map<Long, Long> counts = countByCourseId(unique);
        return unique.stream().map(n -> toResponse(n, counts, unique)).toList();
    }

    @Transactional(readOnly = true)
    public CourseReportResponse getById(Long id) {
        Notification notification = findReportNotification(id);
        List<Notification> unique = loadUniqueReports();
        Map<Long, Long> counts = countByCourseId(unique);
        return toResponse(notification, counts, unique);
    }

    @Transactional(readOnly = true)
    public CourseReportStatsResponse getStats() {
        List<CourseReportResponse> reports = listAll();
        long open = reports.stream().filter(r -> OPEN_STATUSES.contains(r.status())).count();
        long reportedCourses = reports.stream()
                .filter(r -> OPEN_STATUSES.contains(r.status()))
                .map(CourseReportResponse::courseId)
                .filter(Objects::nonNull)
                .distinct()
                .count();
        long hidden = reports.stream()
                .filter(r -> Boolean.TRUE.equals(r.courseHidden()))
                .map(CourseReportResponse::courseId)
                .filter(Objects::nonNull)
                .distinct()
                .count();
        long resolved = reports.stream().filter(r -> CLOSED_STATUSES.contains(r.status())).count();
        return new CourseReportStatsResponse(open, reportedCourses, hidden, resolved);
    }

    public CourseReportResponse dismiss(Long id, Long adminId) {
        return updateStatus(id, adminId, "DISMISSED", null);
    }

    public CourseReportResponse resolve(Long id, Long adminId) {
        return updateStatus(id, adminId, "RESOLVED", null);
    }

    public CourseReportResponse hideCourse(Long id, Long adminId) {
        Notification seed = findReportNotification(id);
        Long courseId = metaLong(seed.getMetadata(), "courseId");
        if (courseId == null) {
            throw new BusinessException("Report is missing courseId.");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found id=" + courseId));
        course.setIsHidden(true);
        course.setUpdatedAt(Instant.now());
        courseRepository.save(course);

        Instant now = Instant.now();
        List<Notification> toUpdate = new ArrayList<>();
        for (Notification n : notificationRepository.findByTypeOrderByCreatedAtDesc(NotificationType.COURSE_REPORTED)) {
            Map<String, Object> meta = n.getMetadata();
            if (meta == null) continue;
            if (!Objects.equals(metaLong(meta, "courseId"), courseId)) continue;

            Map<String, Object> updated = copyMeta(meta);
            String status = metaString(meta, "status");
            if (OPEN_STATUSES.contains(status)) {
                updated.put("status", "RESOLVED");
                updated.put("adminNote", "Khóa học đã bị ẩn bởi kiểm duyệt");
                updated.put("resolvedAt", now.toString());
                updated.put("resolvedBy", adminId);
            }
            updated.put("courseHidden", true);
            n.setMetadata(updated);
            toUpdate.add(n);
        }
        notificationRepository.saveAll(toUpdate);

        notifyInstructor(
                course,
                "Khóa học của bạn đã bị ẩn",
                "Khóa học \"" + course.getTitle()
                        + "\" đã bị ẩn sau khi có báo cáo từ học viên. Vui lòng rà soát nội dung và liên hệ hỗ trợ nếu cần mở lại.",
                Map.of("courseId", courseId, "action", "HIDE_COURSE", "reportId", id)
        );

        return reloadResponse(id);
    }

    /**
     * Warn the course instructor to revise reported content. Does not close the report.
     * Uses existing NotificationType.GENERIC — no new enum / table.
     */
    public CourseReportResponse warnInstructor(Long id, Long adminId, String message) {
        Notification seed = findReportNotification(id);
        Map<String, Object> seedMeta = seed.getMetadata();
        Long courseId = metaLong(seedMeta, "courseId");
        if (courseId == null) {
            throw new BusinessException("Report is missing courseId.");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found id=" + courseId));

        String reason = metaString(seedMeta, "reason");
        String lessonTitle = metaString(seedMeta, "lessonTitle");
        String note = (message == null || message.isBlank())
                ? "Vui lòng kiểm tra và cập nhật lại nội dung video bị báo cáo trong thời gian sớm nhất."
                : message.trim();

        String reasonLabel = switch (reason == null ? "" : reason) {
            case "MISLEADING_CONTENT" -> "nội dung sai / gây hiểu nhầm";
            case "SENSITIVE_CONTENT" -> "nội dung nhạy cảm / không phù hợp";
            case "SPAM" -> "spam / quảng cáo";
            case "COPYRIGHT" -> "vi phạm bản quyền";
            case "OTHER" -> "lý do khác";
            default -> reason == null ? "chưa rõ" : reason;
        };

        String target = lessonTitle != null
                ? "bài học \"" + lessonTitle + "\" trong khóa \"" + course.getTitle() + "\""
                : "khóa học \"" + course.getTitle() + "\"";

        Map<String, Object> warnMeta = new HashMap<>();
        warnMeta.put("courseId", courseId);
        warnMeta.put("lessonId", metaLong(seedMeta, "lessonId"));
        warnMeta.put("reason", reason != null ? reason : "");
        warnMeta.put("action", "WARN_INSTRUCTOR");
        warnMeta.put("reportId", id);
        warnMeta.put("adminId", adminId);

        notifyInstructor(
                course,
                "Yêu cầu cập nhật nội dung khóa học",
                "Admin yêu cầu bạn kiểm tra và sửa " + target
                        + " (lý do báo cáo: " + reasonLabel + "). " + note,
                warnMeta
        );

        Instant now = Instant.now();
        List<Notification> matched = findMatchingCourseReasonReports(courseId, reason, metaLong(seedMeta, "lessonId"));
        for (Notification n : matched) {
            Map<String, Object> updated = copyMeta(n.getMetadata());
            updated.put("instructorWarned", true);
            if (OPEN_STATUSES.contains(metaString(updated, "status"))) {
                updated.put("status", "REVIEWING");
                updated.put("adminNote", "Đã thông báo giảng viên: " + note);
            }
            updated.put("warnedAt", now.toString());
            updated.put("warnedBy", adminId);
            n.setMetadata(updated);
        }
        notificationRepository.saveAll(matched);

        return reloadResponse(id);
    }

    /**
     * Soft-delete the reported lesson video when the same high-severity reason was reported again
     * (sameReasonCount >= 2). Uses existing lessons.is_deleted — no schema change.
     */
    public CourseReportResponse deleteReportedLesson(Long id, Long adminId) {
        Notification seed = findReportNotification(id);
        Map<String, Object> seedMeta = seed.getMetadata();
        Long courseId = metaLong(seedMeta, "courseId");
        Long lessonId = metaLong(seedMeta, "lessonId");
        String reason = metaString(seedMeta, "reason");

        if (courseId == null || lessonId == null) {
            throw new BusinessException("This report has no lesson target to delete.");
        }
        if (!HIGH_SEVERITY_REASONS.contains(reason)) {
            throw new BusinessException(
                    "Lesson delete is only allowed for high-severity reasons (SENSITIVE_CONTENT, COPYRIGHT)."
            );
        }
        if (!Boolean.TRUE.equals(seedMeta.get("instructorWarned"))
                && findMatchingCourseReasonReports(courseId, reason, lessonId).stream()
                .noneMatch(n -> Boolean.TRUE.equals(n.getMetadata() != null
                        ? n.getMetadata().get("instructorWarned") : null))) {
            throw new BusinessException(
                    "Warn the instructor first, then delete only after the same high-severity reason is reported again."
            );
        }

        long sameReason = countSameReason(loadUniqueReports(), courseId, lessonId, reason);
        if (sameReason < REPEAT_THRESHOLD_FOR_DELETE) {
            throw new BusinessException(
                    "Delete is only allowed after the same high-severity reason is reported again "
                            + "(need at least " + REPEAT_THRESHOLD_FOR_DELETE + " reports)."
            );
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found id=" + courseId));
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found id=" + lessonId));

        if (lesson.getSection() == null
                || lesson.getSection().getCourse() == null
                || !Objects.equals(lesson.getSection().getCourse().getId(), courseId)) {
            throw new BusinessException("Lesson does not belong to the reported course.");
        }

        if (Boolean.TRUE.equals(lesson.getIsDeleted())) {
            throw new BusinessException("This lesson was already deleted.");
        }

        lesson.setIsDeleted(true);
        lesson.setUpdatedAt(Instant.now());
        lessonRepository.save(lesson);

        Instant now = Instant.now();
        List<Notification> toUpdate = findMatchingCourseReasonReports(courseId, reason, lessonId);
        for (Notification n : toUpdate) {
            Map<String, Object> updated = copyMeta(n.getMetadata());
            updated.put("lessonDeleted", true);
            if (OPEN_STATUSES.contains(metaString(updated, "status"))) {
                updated.put("status", "RESOLVED");
                updated.put("adminNote", "Lesson video soft-deleted after repeated high-severity reports");
                updated.put("resolvedAt", now.toString());
                updated.put("resolvedBy", adminId);
            }
            n.setMetadata(updated);
        }
        notificationRepository.saveAll(toUpdate);

        notifyInstructor(
                course,
                "Lesson removed by moderation",
                "The lesson \"" + lesson.getTitle() + "\" in \"" + course.getTitle()
                        + "\" was removed after repeated " + reason
                        + " reports. Please replace the content if you republish a new lesson.",
                Map.of(
                        "courseId", courseId,
                        "lessonId", lessonId,
                        "reason", reason,
                        "action", "DELETE_LESSON",
                        "reportId", id
                )
        );

        return reloadResponse(id);
    }

    private CourseReportResponse updateStatus(Long id, Long adminId, String status, String adminNote) {
        Notification seed = findReportNotification(id);
        String current = metaString(seed.getMetadata(), "status");
        if (!OPEN_STATUSES.contains(current)) {
            throw new BusinessException("Only open reports can be updated.");
        }

        String reportKey = metaString(seed.getMetadata(), "reportKey");
        Instant now = Instant.now();
        List<Notification> group = findByReportKey(reportKey);
        for (Notification n : group) {
            Map<String, Object> meta = copyMeta(n.getMetadata());
            meta.put("status", status);
            meta.put("adminNote", adminNote);
            meta.put("resolvedAt", now.toString());
            meta.put("resolvedBy", adminId);
            n.setMetadata(meta);
        }
        notificationRepository.saveAll(group);

        return reloadResponse(id);
    }

    private List<Notification> loadUniqueReports() {
        Map<String, Notification> unique = new LinkedHashMap<>();
        for (Notification n : notificationRepository.findByTypeOrderByCreatedAtDesc(NotificationType.COURSE_REPORTED)) {
            String key = metaString(n.getMetadata(), "reportKey");
            if (key == null || key.isBlank()) {
                key = "notif-" + n.getId();
            }
            unique.putIfAbsent(key, n);
        }
        return new ArrayList<>(unique.values());
    }

    private Map<Long, Long> countByCourseId(List<Notification> uniqueReports) {
        return uniqueReports.stream()
                .map(n -> metaLong(n.getMetadata(), "courseId"))
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(id -> id, Collectors.counting()));
    }

    private boolean hasPendingReport(Long reporterId, Long courseId) {
        // Block only while a report is still PENDING.
        // After admin warns (REVIEWING), the same student may report again (= "báo cáo lại").
        return loadUniqueReports().stream().anyMatch(n -> {
            Map<String, Object> meta = n.getMetadata();
            return Objects.equals(metaLong(meta, "reporterId"), reporterId)
                    && Objects.equals(metaLong(meta, "courseId"), courseId)
                    && "PENDING".equals(metaString(meta, "status"));
        });
    }

    private Notification findReportNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found id=" + id));
        if (notification.getType() != NotificationType.COURSE_REPORTED) {
            throw new ResourceNotFoundException("Report not found id=" + id);
        }
        return notification;
    }

    private List<Notification> findByReportKey(String reportKey) {
        if (reportKey == null || reportKey.isBlank()) {
            return List.of();
        }
        List<Notification> matched = new ArrayList<>();
        for (Notification n : notificationRepository.findByTypeOrderByCreatedAtDesc(NotificationType.COURSE_REPORTED)) {
            if (reportKey.equals(metaString(n.getMetadata(), "reportKey"))) {
                matched.add(n);
            }
        }
        return matched;
    }

    private CourseReportResponse toResponse(
            Notification notification,
            Map<Long, Long> countsByCourse,
            List<Notification> uniqueReports
    ) {
        Map<String, Object> meta = notification.getMetadata() != null ? notification.getMetadata() : Map.of();
        Long courseId = metaLong(meta, "courseId");
        long reportCount = courseId == null ? 0L : countsByCourse.getOrDefault(courseId, 0L);

        boolean courseHidden = Boolean.TRUE.equals(meta.get("courseHidden"));
        if (courseId != null) {
            courseHidden = courseRepository.findById(courseId)
                    .map(c -> Boolean.TRUE.equals(c.getIsHidden()))
                    .orElse(courseHidden);
        }

        String status = metaString(meta, "status");
        if (status == null) status = "PENDING";

        Instant resolvedAt = null;
        String resolvedRaw = metaString(meta, "resolvedAt");
        if (resolvedRaw != null && !resolvedRaw.isBlank()) {
            try {
                resolvedAt = Instant.parse(resolvedRaw);
            } catch (Exception ignored) {
                resolvedAt = null;
            }
        }

        String reportKey = metaString(meta, "reportKey");
        String reportCode = reportKey != null && reportKey.length() >= 8
                ? "RPT-" + reportKey.substring(0, 8).toUpperCase()
                : "RPT-" + notification.getId();

        Long lessonId = metaLong(meta, "lessonId");
        String reason = metaString(meta, "reason");
        String severity = metaString(meta, "severity");
        if (severity == null) {
            severity = severityOf(reason);
        }

        long sameReasonCount = countSameReason(uniqueReports, courseId, lessonId, reason);

        boolean instructorWarned = Boolean.TRUE.equals(meta.get("instructorWarned"));
        if (!instructorWarned && courseId != null && reason != null) {
            instructorWarned = uniqueReports.stream().anyMatch(n -> {
                Map<String, Object> other = n.getMetadata();
                return Objects.equals(metaLong(other, "courseId"), courseId)
                        && reason.equals(metaString(other, "reason"))
                        && (lessonId == null
                            || metaLong(other, "lessonId") == null
                            || Objects.equals(metaLong(other, "lessonId"), lessonId))
                        && Boolean.TRUE.equals(other != null ? other.get("instructorWarned") : null);
            });
        }
        boolean lessonDeleted = Boolean.TRUE.equals(meta.get("lessonDeleted"));
        if (lessonId != null && !lessonDeleted) {
            lessonDeleted = lessonRepository.findById(lessonId)
                    .map(l -> Boolean.TRUE.equals(l.getIsDeleted()))
                    .orElse(false);
        }

        boolean canDeleteLesson = "HIGH".equals(severity)
                && lessonId != null
                && !lessonDeleted
                && sameReasonCount >= REPEAT_THRESHOLD_FOR_DELETE
                && instructorWarned;

        return new CourseReportResponse(
                notification.getId(),
                reportCode,
                reportKey,
                courseId,
                metaString(meta, "courseTitle"),
                courseHidden,
                lessonId,
                metaString(meta, "lessonTitle"),
                metaLong(meta, "reporterId"),
                metaString(meta, "reporterName"),
                reason,
                metaString(meta, "description"),
                status,
                reportCount,
                metaString(meta, "adminNote"),
                notification.getCreatedAt(),
                resolvedAt,
                severity,
                sameReasonCount,
                instructorWarned,
                lessonDeleted,
                canDeleteLesson
        );
    }

    private CourseReportResponse reloadResponse(Long id) {
        List<Notification> unique = loadUniqueReports();
        Map<Long, Long> counts = countByCourseId(unique);
        return toResponse(findReportNotification(id), counts, unique);
    }

    private void notifyInstructor(Course course, String title, String content, Map<String, Object> metadata) {
        User instructor = course.getInstructor();
        if (instructor == null) {
            return;
        }
        try {
            notificationService.create(
                    instructor,
                    NotificationType.GENERIC,
                    title,
                    content,
                    "/learnova/teacher/courses",
                    metadata
            );
        } catch (RuntimeException ex) {
            // Moderation action already applied — do not fail the admin request if notify fails.
        }
    }

    private String severityOf(String reason) {
        return HIGH_SEVERITY_REASONS.contains(reason) ? "HIGH" : "NORMAL";
    }

    private long countSameReason(List<Notification> uniqueReports, Long courseId, Long lessonId, String reason) {
        if (courseId == null || reason == null) {
            return 0L;
        }
        return uniqueReports.stream()
                .filter(n -> Objects.equals(metaLong(n.getMetadata(), "courseId"), courseId))
                .filter(n -> reason.equals(metaString(n.getMetadata(), "reason")))
                .filter(n -> {
                    if (lessonId == null) {
                        return true;
                    }
                    Long reportedLesson = metaLong(n.getMetadata(), "lessonId");
                    return reportedLesson == null || Objects.equals(reportedLesson, lessonId);
                })
                .count();
    }

    private List<Notification> findMatchingCourseReasonReports(Long courseId, String reason, Long lessonId) {
        List<Notification> matched = new ArrayList<>();
        for (Notification n : notificationRepository.findByTypeOrderByCreatedAtDesc(NotificationType.COURSE_REPORTED)) {
            Map<String, Object> meta = n.getMetadata();
            if (!Objects.equals(metaLong(meta, "courseId"), courseId)) continue;
            if (reason != null && !reason.equals(metaString(meta, "reason"))) continue;
            if (lessonId != null) {
                Long reportedLesson = metaLong(meta, "lessonId");
                if (reportedLesson != null && !Objects.equals(reportedLesson, lessonId)) continue;
            }
            matched.add(n);
        }
        return matched;
    }

    private Map<String, Object> copyMeta(Map<String, Object> source) {
        return source == null ? new HashMap<>() : new HashMap<>(source);
    }

    private String metaString(Map<String, Object> meta, String key) {
        if (meta == null || meta.get(key) == null) return null;
        String value = String.valueOf(meta.get(key)).trim();
        if (value.isEmpty() || "null".equalsIgnoreCase(value) || "undefined".equalsIgnoreCase(value)) {
            return null;
        }
        return value;
    }

    private Long metaLong(Map<String, Object> meta, String key) {
        if (meta == null || meta.get(key) == null) return null;
        Object value = meta.get(key);
        if (value instanceof Number number) {
            return number.longValue();
        }
        try {
            return Long.parseLong(String.valueOf(value));
        } catch (NumberFormatException ex) {
            return null;
        }
    }
}
