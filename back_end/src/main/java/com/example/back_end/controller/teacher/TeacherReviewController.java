package com.example.back_end.controller.teacher;

import com.example.back_end.dto.request.teacher.ReplyReviewRequest;
import com.example.back_end.dto.response.teacher.TeacherReviewResponse;
import com.example.back_end.service.teacher.TeacherCourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/teacher/reviews")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherReviewController {

    private final TeacherCourseService teacherCourseService;

    @GetMapping
    public ResponseEntity<List<TeacherReviewResponse>> getMyReviews(Authentication authentication) {
        return ResponseEntity.ok(teacherCourseService.getMyReviews(authentication.getName()));
    }

    @PatchMapping("/{reviewId}/reply")
    public ResponseEntity<Void> replyToReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody ReplyReviewRequest request,
            Authentication authentication
    ) {
        teacherCourseService.replyToReview(reviewId, authentication.getName(), request.reply());
        return ResponseEntity.noContent().build();
    }
}
