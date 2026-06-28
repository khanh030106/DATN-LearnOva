package com.example.back_end.dto.resquest;

import lombok.Data;

@Data
public class CreateAnswerRequest {
    private Long parentId; // questionId
    private Long parentAnswerId;
    private String content;
}