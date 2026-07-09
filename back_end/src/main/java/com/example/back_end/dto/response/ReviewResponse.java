package com.example.back_end.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class ReviewResponse {
    private Long reviewId;
    private Long userId;
    private String userName;
    private Integer rating;
    private String comment;
    private Instant createdAt;
    private String avatar;
}