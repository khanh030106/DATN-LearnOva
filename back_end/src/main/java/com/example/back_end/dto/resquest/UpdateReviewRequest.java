package com.example.back_end.dto.resquest;

import lombok.Data;

@Data
public class UpdateReviewRequest {

    private Long reviewId;
    private Integer rating;
    private String comment;
}