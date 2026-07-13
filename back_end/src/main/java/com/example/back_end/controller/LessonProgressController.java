package com.example.back_end.controller;

import com.example.back_end.dto.response.CourseProgressResponse;
import com.example.back_end.dto.request.UpdateLessonProgressRequest;
import com.example.back_end.security.CustomUserDetails;
import com.example.back_end.service.LessonProgressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learnova/progress")
@RequiredArgsConstructor
public class LessonProgressController {

    private final LessonProgressService lessonProgressService;

    @PostMapping("/update")
    public ResponseEntity<CourseProgressResponse> updateProgress(
            Authentication authentication,
            @Valid @RequestBody UpdateLessonProgressRequest request
    ) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            return ResponseEntity.status(401).build();
        }
        CourseProgressResponse response = lessonProgressService.updateProgress(userDetails.getId(), request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<CourseProgressResponse> getCourseProgress(
            Authentication authentication,
            @PathVariable Long courseId
    ) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            return ResponseEntity.status(401).build();
        }
        CourseProgressResponse response = lessonProgressService.getCourseProgress(userDetails.getId(), courseId);
        return ResponseEntity.ok(response);
    }
}
