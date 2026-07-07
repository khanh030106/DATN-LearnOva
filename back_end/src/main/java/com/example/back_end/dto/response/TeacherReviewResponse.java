package com.example.back_end.dto.response;

import java.time.Instant;

public record TeacherReviewResponse(
        Long reviewId,
        Long courseId,
        String courseTitle,
        Long userId,
        String userName,
        String avatar,
        Integer rating,
        String comment,
        Instant createdAt
) {}
