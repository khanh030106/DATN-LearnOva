package com.example.back_end.dto.resquest;

import com.example.back_end.entity.enums.GenderType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record InstructorRequest(
        @NotBlank String fullName,
        @NotBlank @Email String email,
        String avatar,
        String phone,
        GenderType gender,
        Boolean isActive
) {}