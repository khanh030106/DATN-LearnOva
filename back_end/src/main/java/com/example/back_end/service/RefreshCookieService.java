package com.example.back_end.service;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import java.time.Duration;

@Service
public class RefreshCookieService {

    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    @Value("${jwt.refresh-token-expiration}")
    private Long refreshTokenExpiration;

    @Value("${jwt.refresh-token-remember-expiration}")
    private Long refreshTokenRememberExpiration;

    public ResponseCookie createRefreshTokenCookie(String refreshToken, Boolean remember) {
        Long expiration = Boolean.TRUE.equals(remember)
                ? refreshTokenRememberExpiration
                : refreshTokenExpiration;

        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/api/learnova/auth")
                .maxAge(Duration.ofMillis(expiration))
                .sameSite("Lax")
                .build();
    }

    public ResponseCookie clearRefreshTokenCookie() {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(false)
                .path("/api/learnova/auth")
                .maxAge(0)
                .sameSite("Lax")
                .build();
    }
}