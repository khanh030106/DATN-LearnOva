package com.example.back_end.dto.response;

import java.time.Instant;

public record LessonSummaryResponse(
        Long lessonId,
        String content,
        Instant updatedAt
) {
}
