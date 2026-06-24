package com.example.back_end.dto.response.admin;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public record AdminCourseResponse(
    Long id,
    String thumbnailUrl,
    String title,
    String slug,
    String description,
    String language,
    List<String> requirements,
    List<String> whatYouLearn,
    BigDecimal basePrice,
    String level,
    String status,
    Long instructorId,
    String instructorName,
    OffsetDateTime publishedAt
) {}
