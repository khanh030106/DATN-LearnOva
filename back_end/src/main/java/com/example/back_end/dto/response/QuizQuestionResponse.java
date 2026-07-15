package com.example.back_end.dto.response;

import java.util.List;

public record QuizQuestionResponse(
        Long questionId,
        String questionText,
        List<QuizOptionResponse> options
) {
}
