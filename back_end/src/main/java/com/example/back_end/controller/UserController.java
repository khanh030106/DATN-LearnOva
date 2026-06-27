package com.example.back_end.controller;

import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.service.AuthService;
import com.example.back_end.service.UserService;
import com.example.back_end.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import java.time.Instant;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class UserController {

        private final AuthService authService;
        private final UserService userService;
        private final UserRepository userRepository;

        @GetMapping("/user/me")
        public ResponseEntity<CurrentUserResponse> me(
                        Authentication authentication) {

                String email = authentication.getName();

                return ResponseEntity.ok(
                                authService.getCurrentUser(email));
        }

        @PostMapping("/admin/create/users")
        public ResponseEntity<User> createUser(
                        @RequestBody User user) {

                user.setId(null);
                user.setIsDeleted(false);
                User saved = userRepository.save(user);

                return ResponseEntity.ok(saved);
        }

        @PutMapping("/admin/update/users/{id}")
        public ResponseEntity<User> updateUser(
                        @PathVariable Long id,
                        @RequestBody User request) {

                return ResponseEntity.ok(
                                userService.updateUser(id, request));
        }

        @DeleteMapping("/admin/delete/users/{id}")
        public ResponseEntity<String> deleteUser(
                        @PathVariable Long id) {
                User user = userRepository
                .findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

                user.setIsDeleted(true);
                user.setUpdatedAt(Instant.now());

                userRepository.save(user);

                return ResponseEntity.ok("User deleted successfully");
        }

        @GetMapping("/admin/users")
        public ResponseEntity<List<User>> getAllUsers() {
                List<User> users = userRepository.findByIsDeletedFalse();
                return ResponseEntity.ok(users);
        }

        // Debug endpoint to check all users (public access for testing)
        @GetMapping("/debug/users")
        public ResponseEntity<List<User>> debugGetAllUsers() {
                List<User> users = userRepository.findAll();
                return ResponseEntity.ok(users);
        }

}