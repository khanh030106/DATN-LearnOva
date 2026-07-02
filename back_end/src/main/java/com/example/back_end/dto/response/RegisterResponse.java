package com.example.back_end.dto.response;

public record RegisterResponse(
        boolean success,
        String message
) {}