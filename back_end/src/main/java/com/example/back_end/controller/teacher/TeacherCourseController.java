package com.example.back_end.controller.teacher;

import com.example.back_end.dto.request.CreateDraftCourseRequest;
import com.example.back_end.dto.request.ReplyReviewRequest;
import com.example.back_end.dto.request.UpdateCourseRequest;
import com.example.back_end.dto.request.UpdateCourseStatusRequest;
import com.example.back_end.dto.response.CreateDraftCourseResponse;
import com.example.back_end.dto.response.teacher.TeacherCoursesResponse;
import com.example.back_end.dto.response.teacher.TeacherReviewResponse;
import com.example.back_end.dto.response.teacher.TeacherStudentResponse;
import com.example.back_end.service.teacher.TeacherCourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/teacher/courses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherCourseController {

    private final TeacherCourseService teacherCourseService;

    @PostMapping("/create-draft-course")
    public CreateDraftCourseResponse createDraftCourse(
            @Valid @RequestBody CreateDraftCourseRequest request,
            Authentication authentication
    ) {
        Long courseId = teacherCourseService.createDraftCourse(request, authentication.getName());
        return new CreateDraftCourseResponse(courseId);
    }

    @PatchMapping("/{courseId}/status")
    public ResponseEntity<Void> updateCourseStatus(
            @PathVariable Long courseId,
            @Valid @RequestBody UpdateCourseStatusRequest request,
            Authentication authentication
    ) {
        teacherCourseService.updateCourseStatus(courseId, authentication.getName(), request.status());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-courses")
    public ResponseEntity<List<TeacherCoursesResponse>> getMyCourses(Authentication authentication) {
        return ResponseEntity.ok(teacherCourseService.getMyCourses(authentication.getName()));
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<Void> updateCourse(
            @PathVariable Long courseId,
            @Valid @RequestBody UpdateCourseRequest request,
            Authentication authentication
    ) {
        teacherCourseService.updateCourse(courseId, request, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{courseId}/visibility")
    public ResponseEntity<Void> toggleCourseVisibility(
            @PathVariable Long courseId,
            Authentication authentication
    ) {
        teacherCourseService.toggleCourseVisibility(courseId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> softDeleteCourse(
            @PathVariable Long courseId,
            Authentication authentication
    ) {
        teacherCourseService.softDeleteCourse(courseId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-students")
    public ResponseEntity<List<TeacherStudentResponse>> getMyStudents(Authentication authentication) {
        return ResponseEntity.ok(teacherCourseService.getMyStudents(authentication.getName()));
    }

    @GetMapping("/my-reviews")
    public ResponseEntity<List<TeacherReviewResponse>> getMyReviews(Authentication authentication) {
        return ResponseEntity.ok(teacherCourseService.getMyReviews(authentication.getName()));
    }

    @PatchMapping("/reviews/{reviewId}/reply")
    public ResponseEntity<Void> replyToReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody ReplyReviewRequest request,
            Authentication authentication
    ) {
        teacherCourseService.replyToReview(reviewId, authentication.getName(), request.getReply());
        return ResponseEntity.noContent().build();
    }
}
