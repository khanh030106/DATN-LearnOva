package com.example.back_end.dto.resquest.admin;

import com.example.back_end.entity.enums.GenderType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record InstructorRequest(
        @NotBlank String fullName,
        @NotBlank @Email String email,
        String avatar,
        String coverImage,
        String phone,
        LocalDate dateOfBirth,
        GenderType gender,
        Boolean isActive,
        String password
) {}
