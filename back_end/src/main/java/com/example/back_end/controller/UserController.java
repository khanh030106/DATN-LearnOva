package com.example.back_end.controller;

import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.security.CustomUserDetails;
import com.example.back_end.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.entity.User;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class UserController {

        private final AuthService authService;
        private final UserRepository userRepository;

        @GetMapping("/user/me")
        public ResponseEntity<CurrentUserResponse> me(
                        Authentication authentication) {

                String email = authentication.getName();
                return ResponseEntity.ok(
                                authService.getCurrentUser(email));
        }

        // THÊM USER
        @PostMapping("/admin/create/users")
        public ResponseEntity<User> createUser(
                        @RequestBody User user) {

                user.setId(null);
                user.setIsDeleted(false);

                User savedUser = userRepository.save(user);

                return ResponseEntity.ok(savedUser);
        }

        // SỬA USER
        @PutMapping("/update/users/{id}")
        public ResponseEntity<User> updateUser(
                        @PathVariable Long id,
                        @RequestBody User request) {

                User user = userRepository.findByIdAndIsDeletedFalse(id)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                user.setFullName(request.getFullName());
                user.setPhone(request.getPhone());
                user.setAvatar(request.getAvatar());
                user.setCoverImage(request.getCoverImage());
                user.setDateOfBirth(request.getDateOfBirth());
                user.setGender(request.getGender());

                user.setUpdatedAt(java.time.Instant.now());

                User updatedUser = userRepository.save(user);

                return ResponseEntity.ok(updatedUser);
        }

        // XÓA USER (SOFT DELETE)
        @DeleteMapping("/admin/delete/users/{id}")
        public ResponseEntity<String> deleteUser(
                        @PathVariable Long id) {

                User user = userRepository.findByIdAndIsDeletedFalse(id)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                user.setIsDeleted(true);
                user.setUpdatedAt(java.time.Instant.now());

                userRepository.save(user);

                return ResponseEntity.ok("User deleted successfully");
        }
}