package com.example.back_end.dto.response;

public record AuthTokenResponse(
        String accessToken,
        String refreshToken
) {}