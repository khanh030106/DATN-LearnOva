package com.example.back_end.dto.resquest;

public record UpdateLessonVideoRequest(
        String videoKey,
        String videoOriginalFilename,
        String videoContentType,
        Long videoSizeBytes,
        Integer durationSeconds
) {
}
