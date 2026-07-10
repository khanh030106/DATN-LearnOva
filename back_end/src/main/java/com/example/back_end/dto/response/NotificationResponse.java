package com.example.back_end.dto.response;

import java.time.Instant;

public record NotificationResponse(
        Long id,
        String type,
        String title,
        String content,
        Boolean isRead,
        String link,
        Instant createdAt
) {
}
