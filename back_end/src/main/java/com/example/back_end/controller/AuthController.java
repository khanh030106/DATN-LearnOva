 package com.example.back_end.controller;

 import com.example.back_end.dto.response.AuthResponse;
 import com.example.back_end.dto.resquest.LoginRequest;
 import com.example.back_end.service.AuthService;
 import lombok.RequiredArgsConstructor;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.PostMapping;
 import org.springframework.web.bind.annotation.RequestBody;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RestController;


 @RestController
 @RequiredArgsConstructor
 @RequestMapping("/api/learnova/auth")
 public class AuthController {

     private final AuthService authService;

      @PostMapping("/login")
      public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
            return ResponseEntity.ok(authService.login(request));
      }
 }