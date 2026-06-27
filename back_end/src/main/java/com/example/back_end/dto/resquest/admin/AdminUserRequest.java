package com.example.back_end.dto.resquest.admin;

import java.time.LocalDate;
import com.example.back_end.entity.enums.GenderType;

public record AdminUserRequest(
    String fullName,
    String email,
    String phone,
    String avatar,
    String coverImage,
    LocalDate dateOfBirth,
    GenderType gender,
    String password,
    String role,
    Boolean isActive,
    Boolean isDeleted
) {}