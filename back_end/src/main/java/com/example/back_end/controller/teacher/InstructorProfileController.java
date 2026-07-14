package com.example.back_end.controller.teacher;

import com.example.back_end.dto.request.teacher.UpdateInstructorProfileRequest;
import com.example.back_end.dto.response.teacher.InstructorProfileResponse;
import com.example.back_end.service.teacher.InstructorProfileService;
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
@PreAuthorize("hasRole('TEACHER')")
public class InstructorProfileController {

    private final InstructorProfileService instructorProfileService;

    @GetMapping
    public ResponseEntity<InstructorProfileResponse> getMyProfile(Authentication authentication) {
        return ResponseEntity.ok(instructorProfileService.getMyProfile(authentication.getName()));
    }

    @PutMapping
    public ResponseEntity<InstructorProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateInstructorProfileRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(instructorProfileService.updateMyProfile(authentication.getName(), request));
    }
}
