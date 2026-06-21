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

import com.example.back_end.dto.response.admin.InstructorResponse;
import com.example.back_end.dto.resquest.admin.InstructorRequest;
import com.example.back_end.service.admin.InstructorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/admin/instructors-management")
public class InstructorController {

    private final InstructorService adminInstructorService;

    @GetMapping
    public ResponseEntity<List<InstructorResponse>> getAllInstructors() {
        return ResponseEntity.ok(
            adminInstructorService.getAllInstructors()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorResponse> getInstructorById(@PathVariable Long id) {
        return ResponseEntity.ok(adminInstructorService.getInstructorById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<InstructorResponse> createInstructor(
            @RequestBody @Valid InstructorRequest request) {
        return ResponseEntity.ok(adminInstructorService.createInstructor(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<InstructorResponse> updateInstructor(
            @PathVariable Long id,
            @RequestBody @Valid InstructorRequest request) {
        return ResponseEntity.ok(adminInstructorService.updateInstructor(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        adminInstructorService.deleteInstructor(id);
        return ResponseEntity.noContent().build();
    }
}