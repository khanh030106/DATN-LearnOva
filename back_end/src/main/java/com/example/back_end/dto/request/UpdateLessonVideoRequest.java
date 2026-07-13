package com.example.back_end.dto.request;

public record UpdateLessonVideoRequest(
        String videoKey,
        String videoOriginalFilename,
        String videoContentType,
        Long videoSizeBytes,
        Integer durationSeconds
) {
}
