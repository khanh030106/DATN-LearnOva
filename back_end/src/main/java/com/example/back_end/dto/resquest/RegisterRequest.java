package com.example.back_end.dto.resquest;

public record RegisterRequest(
        String email,
        String password,
        String confirmPassword
) {}