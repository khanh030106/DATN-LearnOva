package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

public record LoginRequest(
        String email,
        String password,
        Boolean rememberMe
) { }