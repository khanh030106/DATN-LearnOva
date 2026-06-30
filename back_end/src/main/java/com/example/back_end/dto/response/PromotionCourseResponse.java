package com.example.back_end.dto.response;

public record PromotionCourseResponse(
        Long courseId,
        Long promotionId,
        Integer discountPercent,
        String startDate,
        String endDate
) {
}
