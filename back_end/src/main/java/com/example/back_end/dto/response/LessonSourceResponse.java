package com.example.back_end.dto.response;

import com.example.back_end.entity.enums.LessonSourceType;

public record LessonSourceResponse(
        Long id,
        String fileKey,
        String originalFileName,
        LessonSourceType resourceType
) {
}
