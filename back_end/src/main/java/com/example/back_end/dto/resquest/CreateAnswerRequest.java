package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateAnswerRequest {

    @NotNull(message = "Question ID is required")
    @Positive(message = "Question ID must be a positive number")
    private Long parentId; // questionId

    @NotBlank(message = "Answer content is required")
    private String content;
}
