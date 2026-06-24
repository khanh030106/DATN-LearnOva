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

import com.example.back_end.dto.response.admin.AdminInstructorResponse;
import com.example.back_end.dto.resquest.admin.AdminInstructorRequest;
import com.example.back_end.service.admin.AdminInstructorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/admin/instructors-management")
public class AdminInstructorController {

    private final AdminInstructorService adminInstructorService;

    @GetMapping
    public ResponseEntity<List<AdminInstructorResponse>> getAllInstructors() {
        return ResponseEntity.ok(
            adminInstructorService.getAllInstructors()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminInstructorResponse> getInstructorById(@PathVariable Long id) {
        return ResponseEntity.ok(adminInstructorService.getInstructorById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<AdminInstructorResponse> createInstructor(
            @RequestBody @Valid AdminInstructorRequest request) {
        return ResponseEntity.ok(adminInstructorService.createInstructor(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AdminInstructorResponse> updateInstructor(
            @PathVariable Long id,
            @RequestBody @Valid AdminInstructorRequest request) {
        return ResponseEntity.ok(adminInstructorService.updateInstructor(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        adminInstructorService.deleteInstructor(id);
        return ResponseEntity.noContent().build();
    }
}