package com.example.back_end.dto.response;

import java.time.Instant;

public record TeacherApplicationResponse(
        Long id,
        Long userId,
        String userFullName,
        String userEmail,
        String userAvatar,
        String specialization,
        String experience,
        String cvKey,
        String status,
        String rejectionReason,
        Instant createdAt,
        Instant reviewedAt
) {}
