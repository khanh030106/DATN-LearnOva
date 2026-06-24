package com.example.back_end.dto.response.admin;

import java.time.Instant;
import java.time.LocalDate;

import com.example.back_end.entity.enums.GenderType;

public record AdminUserResponse(
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
    Instant createdAt,
    Boolean isDeleted,
    Instant updatedAt
) {}
