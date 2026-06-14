package com.example.back_end.controller;

import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/learnova")
public class UserController {

    @GetMapping("/users/me")
    public ResponseEntity<CurrentUserResponse> getCurrentUser(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        var user = currentUser.getUser();

        return ResponseEntity.ok(
                new CurrentUserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getAvatar(),
                        user.getDateOfBirth()
                )
        );
    }
}

