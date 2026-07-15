package com.example.back_end.dto.response.teacher;

public record PromotionCourseResponse(
        Long courseId,
        Long promotionId,
        Integer discountPercent,
        String startDate,
        String endDate
) {
}
