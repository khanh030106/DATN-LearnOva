package com.example.back_end.dto.response;

import java.time.Instant;
import java.time.LocalDate;

import com.example.back_end.entity.enums.GenderType;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        String phone,
        String avatar,
        String coverImage,
        LocalDate dateOfBirth,
        GenderType gender,
        String role,
        String status,
        Instant joinedAt,
        Boolean isDeleted,
        Instant updatedAt
) {}
