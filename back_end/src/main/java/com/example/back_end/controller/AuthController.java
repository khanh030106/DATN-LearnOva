package com.example.back_end.controller;

import com.example.back_end.dto.response.AuthTokenResponse;
import com.example.back_end.dto.response.ErrorResponse;
import com.example.back_end.dto.response.LoginResponse;
import com.example.back_end.dto.resquest.LoginRequest;
import com.example.back_end.service.AuthService;
import com.example.back_end.service.RefreshCookieService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import com.example.back_end.dto.resquest.RegisterRequest;
import com.example.back_end.dto.response.RegisterResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/auth")
public class AuthController {
        private final AuthService authService;
        private final RefreshCookieService refreshCookieService;

        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ErrorResponse> handleBadCredentials() {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(new ErrorResponse("Login failed. Please check your email and password."));
        }

        @PostMapping("/login")
        public ResponseEntity<LoginResponse> login(
                        @RequestBody LoginRequest request,
                        HttpServletResponse response) {
                AuthTokenResponse result = authService.login(request);

                response.addHeader(
                                HttpHeaders.SET_COOKIE,
                                refreshCookieService
                                                .createRefreshTokenCookie(result.refreshToken(), request.rememberMe())
                                                .toString());

                return ResponseEntity.ok(new LoginResponse(result.accessToken()));
        }

         response.addHeader(
                 HttpHeaders.SET_COOKIE,
                 refreshCookieService.createRefreshTokenCookie(result.refreshToken(), request.rememberMe()).toString()
         );

         response.addHeader(
                 HttpHeaders.SET_COOKIE,
                 refreshCookieService.createAccessTokenCookie(result.accessToken()).toString()
         );

                return ResponseEntity.ok(response);
        }

        @PostMapping("/logout")
        public ResponseEntity<Void> logout(
                        @CookieValue(value = "refreshToken", required = false) String refreshToken,
                        HttpServletResponse response) {
                authService.logout(refreshToken);

     @PostMapping("/refresh")
     public ResponseEntity<LoginResponse> refresh(
           @CookieValue(value = "refreshToken", required = false) String refreshToken,
           HttpServletResponse response
     ) {
     if (refreshToken == null) {
          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
     }

     try {
          LoginResponse loginResponse = authService.refreshAccessToken(refreshToken);

          response.addHeader(
                  HttpHeaders.SET_COOKIE,
                  refreshCookieService.createAccessTokenCookie(loginResponse.accessToken()).toString()
          );

          return ResponseEntity.ok(loginResponse);
     } catch (RuntimeException e) {
          response.addHeader(
                  HttpHeaders.SET_COOKIE,
                  refreshCookieService.clearRefreshTokenCookie().toString()
          );
          response.addHeader(
                  HttpHeaders.SET_COOKIE,
                  refreshCookieService.clearAccessTokenCookie().toString()
          );
          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
     }
     }

        @PostMapping("/register")
        public ResponseEntity<?> register(
                        @RequestBody RegisterRequest request) {
                authService.register(request);

                return ResponseEntity.ok(
                                new RegisterResponse(
                                                true,
                                                "Registration successful. Please verify your email."));
        }

     response.addHeader(
             HttpHeaders.SET_COOKIE,
             refreshCookieService.clearRefreshTokenCookie().toString()
     );

     response.addHeader(
             HttpHeaders.SET_COOKIE,
             refreshCookieService.clearAccessTokenCookie().toString()
     );

     return ResponseEntity.noContent().build();
    }
 }
