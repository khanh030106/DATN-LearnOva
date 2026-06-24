package com.example.back_end.dto.resquest;

import lombok.Data;

@Data
public class CreateQuestionRequest {
    private Long lessonId;
    private String content;
}