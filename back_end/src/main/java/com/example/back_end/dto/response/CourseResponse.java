package com.example.back_end.dto.response;

import java.math.BigDecimal;

public record CourseResponse(
        Long id,
        String title,
        String thumbnailUrl,
        BigDecimal basePrice,
        String level,
        String instructorName
) {
}
