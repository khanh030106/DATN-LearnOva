package com.example.back_end.dto.response.teacher;

import java.time.Instant;

public record AnnouncementResponse(
        Long id,
        Long courseId,
        String courseTitle,
        String title,
        String content,
        int recipientCount,
        Instant createdAt
) {
}
