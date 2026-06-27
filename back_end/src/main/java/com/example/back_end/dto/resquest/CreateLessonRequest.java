package com.example.back_end.dto.resquest;

public record CreateLessonRequest(
        String title,
        Integer lessonOrder,
        Boolean isPreview
) {
}