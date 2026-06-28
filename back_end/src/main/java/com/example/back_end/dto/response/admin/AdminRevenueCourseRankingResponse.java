package com.example.back_end.dto.response.admin;

import java.math.BigDecimal;

public record AdminRevenueCourseRankingResponse(
        Long courseId,
        String title,
        Long instructorId,
        String instructor,
        Long categoryId,
        String category,
        Long students,
        BigDecimal revenue,
        BigDecimal share
) {}
