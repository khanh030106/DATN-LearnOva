package com.example.back_end.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class NotificationResponse {
    private Long id;
    private String title;
    private String content;
    private Boolean isRead;
    private Instant createdAt;
}
