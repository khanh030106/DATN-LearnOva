package com.example.back_end.controller.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dto.request.RejectTeacherApplicationRequest;
import com.example.back_end.dto.response.CvUrlResponse;
import com.example.back_end.dto.response.TeacherApplicationResponse;
import com.example.back_end.service.TeacherApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/admin/teacher-applications")
public class AdminTeacherApplicationController {

    private final TeacherApplicationService teacherApplicationService;

    @GetMapping
    public ResponseEntity<List<TeacherApplicationResponse>> listPending() {
        return ResponseEntity.ok(teacherApplicationService.listPending());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherApplicationResponse> getDetail(@PathVariable Long id) {
        return ResponseEntity.ok(teacherApplicationService.getById(id));
    }

    @GetMapping("/{id}/cv-url")
    public ResponseEntity<CvUrlResponse> getCvUrl(@PathVariable Long id) {
        return ResponseEntity.ok(teacherApplicationService.getCvUrlForAdmin(id));
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<TeacherApplicationResponse> approve(@PathVariable Long id) {
        return ResponseEntity.ok(teacherApplicationService.approve(id));
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<TeacherApplicationResponse> reject(
            @PathVariable Long id,
            @Valid @RequestBody RejectTeacherApplicationRequest request
    ) {
        return ResponseEntity.ok(teacherApplicationService.reject(id, request.reason()));
    }
}
