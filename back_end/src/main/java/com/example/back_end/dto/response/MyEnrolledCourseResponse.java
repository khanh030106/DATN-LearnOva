package com.example.back_end.dto.response;

import com.example.back_end.entity.enums.CourseLevel;
import java.time.Instant;
import java.time.OffsetDateTime;

public record MyEnrolledCourseResponse(
        Long courseId,
        String title,
        String description,
        String instructorName,
        CourseLevel level,
        String thumbnailKey,
        Integer progressPercent,

        Integer totalLessons,
        Integer completedLessons,
        Double averageRating,
        Long reviewCount,

        Instant enrolledAt,
        OffsetDateTime completedAt
) {}
