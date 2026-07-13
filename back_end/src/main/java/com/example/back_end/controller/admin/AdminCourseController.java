package com.example.back_end.controller.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dto.request.RejectCourseRequest;
import com.example.back_end.dto.response.admin.AdminCourseDetailResponse;
import com.example.back_end.dto.response.admin.AdminCourseResponse;
import com.example.back_end.service.admin.AdminCourseService;

import jakarta.validation.Valid;
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

    /** Duyệt khóa học: PENDING_REVIEW → PUBLISHED */
    @PatchMapping("/{id}/approve")
    public ResponseEntity<AdminCourseDetailResponse> approve(@PathVariable Long id) {
        return ResponseEntity.ok(adminCourseService.approveCourse(id));
    }

    /** Ẩn khóa học: PENDING_REVIEW → ARCHIVED */
    @PatchMapping("/{id}/hide")
    public ResponseEntity<AdminCourseDetailResponse> hide(@PathVariable Long id) {
        return ResponseEntity.ok(adminCourseService.hideCourse(id));
    }

    /** Từ chối khóa học: PENDING_REVIEW → REJECTED (kèm lý do) */
    @PatchMapping("/{id}/reject")
    public ResponseEntity<AdminCourseDetailResponse> reject(
            @PathVariable Long id,
            @Valid @RequestBody RejectCourseRequest request
    ) {
        return ResponseEntity.ok(adminCourseService.rejectCourse(id, request.reason()));
    }
}
