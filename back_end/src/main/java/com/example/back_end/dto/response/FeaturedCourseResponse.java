package com.example.back_end.dto.response;

import com.example.back_end.entity.enums.CourseLevel;

import java.math.BigDecimal;

public record FeaturedCourseResponse(
        Long courseId,
        String title,
        String thumbnailKey,
        String instructorName,
        BigDecimal basePrice,
        long studentCount,
        long lessonCount,
        long totalDurationSeconds,
        String categoryName,
        CourseLevel level,
        double rating
) {
}
