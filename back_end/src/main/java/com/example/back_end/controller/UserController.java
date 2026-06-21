package com.example.back_end.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.back_end.dto.resquest.admin.UserRequest;
import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.dto.response.UserResponse;
import com.example.back_end.service.AuthService;
import com.example.back_end.service.admin.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/admin/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping({"/admin/create/users", "/admin/users"})
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PutMapping({"/admin/update/users/{id}", "/admin/users/{id}"})
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping({"/admin/delete/users/{id}", "/admin/users/{id}"})
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/user/me")
    public ResponseEntity<CurrentUserResponse> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(authService.getCurrentUser(authentication.getName()));
    }
}
