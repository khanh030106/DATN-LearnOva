package com.example.back_end.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.dto.response.UserResponse;
import com.example.back_end.entity.User;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class UserController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @GetMapping("/admin/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userRepository.findAll().stream().map(this::toUserResponse).toList();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/me")
    public ResponseEntity<CurrentUserResponse> me(
            Authentication authentication
    ) {

        String email = authentication.getName();
        return ResponseEntity.ok(
                authService.getCurrentUser(email)
        );
    }

    private UserResponse toUserResponse(User user) {
        String role = user.getRoles().stream().map(r -> r.getRoleName().name().replace("ROLE_", "")).findFirst().orElse("USER");

        String status = Boolean.TRUE.equals(user.getIsActive()) ? "Active" : "Inactive";

        return new UserResponse(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getPhone(),
            user.getAvatar(),
            user.getCoverImage(),
            user.getDateOfBirth(),
            user.getGender(),
            role,
            status,
            user.getCreatedAt(),
            user.getIsDeleted(),
            user.getUpdatedAt()
        );
    }
}

