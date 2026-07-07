package com.example.back_end.controller.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dto.response.admin.AdminCourseDetailResponse;
import com.example.back_end.dto.response.admin.AdminCourseResponse;
import com.example.back_end.service.admin.AdminCourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/admin/courses-management")
public class AdminCourseController {

    private final AdminCourseService adminCourseService;

    @GetMapping
    public ResponseEntity<List<AdminCourseResponse>> listAll() {
        return ResponseEntity.ok(adminCourseService.getAllCourses());
    }

    /** Chi tiết đầy đủ kèm sections/lessons — dùng cho popup xem và trang duyệt */
    @GetMapping("/{id}/detail")
    public ResponseEntity<AdminCourseDetailResponse> getDetail(@PathVariable Long id) {
        return ResponseEntity.ok(adminCourseService.getCourseDetail(id));
    }

    /** Duyệt khóa học: DRAFT → PUBLISHED */
    @PatchMapping("/{id}/approve")
    public ResponseEntity<AdminCourseDetailResponse> approve(@PathVariable Long id) {
        return ResponseEntity.ok(adminCourseService.approveCourse(id));
    }

    /** Ẩn khóa học: DRAFT → ARCHIVED */
    @PatchMapping("/{id}/hide")
    public ResponseEntity<AdminCourseDetailResponse> hide(@PathVariable Long id) {
        return ResponseEntity.ok(adminCourseService.hideCourse(id));
    }
}
