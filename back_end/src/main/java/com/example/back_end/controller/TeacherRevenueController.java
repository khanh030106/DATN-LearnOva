package com.example.back_end.controller;

import com.example.back_end.dto.response.TeacherRevenueResponse;
import com.example.back_end.service.TeacherRevenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/teacher/revenue")
public class TeacherRevenueController {

    private final TeacherRevenueService teacherRevenueService;

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping
    public ResponseEntity<TeacherRevenueResponse> getRevenue(Authentication authentication) {
        return ResponseEntity.ok(teacherRevenueService.getRevenue(authentication.getName()));
    }
}
