package com.example.back_end.controller.teacher;

import com.example.back_end.dto.response.teacher.TeacherDashboardResponse;
import com.example.back_end.service.teacher.TeacherDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/teacher/dashboard")
@PreAuthorize("hasRole('TEACHER')")
public class TeacherDashboardController {

    private final TeacherDashboardService teacherDashboardService;

    @GetMapping
    public ResponseEntity<TeacherDashboardResponse> getDashboard(Authentication authentication) {
        return ResponseEntity.ok(teacherDashboardService.getDashboard(authentication.getName()));
    }
}
