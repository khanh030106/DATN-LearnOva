package com.example.back_end.dto.resquest;

public record RegisterRequest(
        String fullName,
        String email,
        String password,
        String confirmPassword
) {}