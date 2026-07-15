package com.example.back_end.dto.request.teacher;

public record UpdateLessonVideoRequest(
        String videoKey,
        String videoOriginalFilename,
        String videoContentType,
        Long videoSizeBytes,
        Integer durationSeconds
) {
}
