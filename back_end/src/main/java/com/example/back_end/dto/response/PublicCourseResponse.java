package com.example.back_end.dto.response;

import com.example.back_end.entity.enums.CourseLevel;
import com.example.back_end.entity.enums.CourseStatus;
import java.math.BigDecimal;

public record PublicCourseResponse(
        Long courseId,
        String title,
        String description,
        String instructorName,
        BigDecimal basePrice,
        CourseLevel level,
        CourseStatus status,
        String thumbnailKey,
        String categoryName,
        long studentCount,
        long lessonCount,
        long totalDurationSeconds,
        double avgRating,
        long ratingCount
) {}
