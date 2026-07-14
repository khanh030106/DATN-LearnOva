package com.example.back_end.controller;

import com.example.back_end.dto.request.UpdateInstructorProfileRequest;
import com.example.back_end.dto.response.InstructorProfileResponse;
import com.example.back_end.service.InstructorProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/teacher/profile")
public class InstructorProfileController {

    private final InstructorProfileService instructorProfileService;

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping
    public ResponseEntity<InstructorProfileResponse> getMyProfile(Authentication authentication) {
        return ResponseEntity.ok(instructorProfileService.getMyProfile(authentication.getName()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PutMapping
    public ResponseEntity<InstructorProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateInstructorProfileRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(instructorProfileService.updateMyProfile(authentication.getName(), request));
    }
}
