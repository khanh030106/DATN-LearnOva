package com.example.back_end.dto.request.teacher;

import com.example.back_end.entity.enums.LessonSourceType;

public record CreateLessonSourceRequest(
        String fileKey,
        String originalFileName,
        String contentType,
        Long fileSizeBytes,
        LessonSourceType resourceType
) {
}
