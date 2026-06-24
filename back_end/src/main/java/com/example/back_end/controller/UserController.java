package com.example.back_end.controller;

import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class UserController {

    private final AuthService authService;

    @GetMapping("/user/me")
    public ResponseEntity<CurrentUserResponse> me(
            Authentication authentication
    ) {

        String email = authentication.getName();
        return ResponseEntity.ok(
                authService.getCurrentUser(email)
        );
    }
}

