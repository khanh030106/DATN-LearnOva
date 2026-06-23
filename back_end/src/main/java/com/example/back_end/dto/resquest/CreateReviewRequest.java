package com.example.back_end.dto.resquest;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private Long courseId;
    private Integer rating;
    private String comment;

}