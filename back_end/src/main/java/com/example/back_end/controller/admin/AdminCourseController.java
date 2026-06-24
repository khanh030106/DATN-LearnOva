package com.example.back_end.controller.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dto.response.admin.AdminCourseResponse;
import com.example.back_end.dto.resquest.admin.AdminCourseRequest;
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

    @GetMapping("/{id}")
    public ResponseEntity<AdminCourseResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(adminCourseService.getCourseById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<AdminCourseResponse> create(@RequestBody @Valid AdminCourseRequest request) {
        return ResponseEntity.ok(adminCourseService.createCourse(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AdminCourseResponse> update(@PathVariable Long id, @RequestBody @Valid AdminCourseRequest request) {
        return ResponseEntity.ok(adminCourseService.updateCourse(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AdminCourseResponse> delete(@PathVariable Long id) {
        return ResponseEntity.ok(adminCourseService.deleteCourse(id));
    }

}
