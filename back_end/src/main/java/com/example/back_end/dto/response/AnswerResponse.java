package com.example.back_end.dto.response;

import lombok.Data;

import java.time.Instant;

@Data
public class AnswerResponse {
    private Long id;
    private String content;

    private Long userId;
    private String userName;

    private Instant createdAt;

    private Integer likeCount;
}