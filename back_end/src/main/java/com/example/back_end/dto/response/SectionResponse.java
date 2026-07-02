package com.example.back_end.dto.response;

import java.util.List;

public record SectionResponse(
        Long id,
        String title,
        Integer completedLessons,
        Integer totalLessons,
        Integer percent,
        List<LessonResponse> lessons
) {
}