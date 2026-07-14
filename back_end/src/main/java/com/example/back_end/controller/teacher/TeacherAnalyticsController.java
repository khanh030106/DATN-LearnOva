package com.example.back_end.controller.teacher;

import com.example.back_end.dto.response.teacher.TeacherAnalyticsResponse;
import com.example.back_end.service.teacher.TeacherAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/teacher/analytics")
public class TeacherAnalyticsController {

    private final TeacherAnalyticsService teacherAnalyticsService;

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping
    public ResponseEntity<TeacherAnalyticsResponse> getAnalytics(Authentication authentication) {
        return ResponseEntity.ok(teacherAnalyticsService.getAnalytics(authentication.getName()));
    }
}
