package com.example.back_end.dto.response;

public record LessonResponse(
        Long id,
        String title,
        String duration,
        Boolean completed
) {
}