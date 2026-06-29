package com.example.back_end.service;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import java.time.Duration;

@Service
public class CookieService {

    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
    private static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";

    @Value("${jwt.refresh-token-expiration}")
    private Long refreshTokenExpiration;

    @Value("${jwt.refresh-token-remember-expiration}")
    private Long refreshTokenRememberExpiration;

    @Value("${jwt.access-token-expiration}")
    private Long accessTokenExpiration;

    // false in local dev, true in production (set COOKIE_SECURE=true in prod env)
    @Value("${server.cookie.secure:false}")
    private boolean secureCookie;

    private String getSameSitePolicy() {
        return secureCookie ? "None" : "Lax";
    }

    public ResponseCookie createRefreshTokenCookie(String refreshToken, Boolean remember) {
        Long expiration = Boolean.TRUE.equals(remember)
                ? refreshTokenRememberExpiration
                : refreshTokenExpiration;

        return ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, refreshToken)
                .httpOnly(true)
                .secure(secureCookie)
                .path("/api/learnova/auth")
                .maxAge(Duration.ofMillis(expiration))
                .sameSite(getSameSitePolicy())
                .build();
    }

    public ResponseCookie clearRefreshTokenCookie() {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(secureCookie)
                .path("/api/learnova/auth")
                .maxAge(0)
                .sameSite(getSameSitePolicy())
                .build();
    }

    public ResponseCookie createAccessTokenCookie(String accessToken) {
        return ResponseCookie.from(ACCESS_TOKEN_COOKIE_NAME, accessToken)
                .httpOnly(true)
                .secure(secureCookie)
                .path("/")
                .maxAge(Duration.ofMillis(accessTokenExpiration))
                .sameSite(getSameSitePolicy())
                .build();
    }

    public ResponseCookie clearAccessTokenCookie() {
        return ResponseCookie.from(ACCESS_TOKEN_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(secureCookie)
                .path("/")
                .maxAge(0)
                .sameSite(getSameSitePolicy())
                .build();
    }
}
