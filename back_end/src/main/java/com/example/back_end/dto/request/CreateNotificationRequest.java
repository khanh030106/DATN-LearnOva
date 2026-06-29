package com.example.back_end.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateNotificationRequest {
    private Long userId;
    private String title;
    private String content;
}
