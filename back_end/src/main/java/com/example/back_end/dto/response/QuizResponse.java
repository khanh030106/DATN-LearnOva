package com.example.back_end.dto.response;

import java.util.List;

public record QuizResponse(
        Long quizId,
        Long lessonId,
        List<QuizQuestionResponse> questions
) {
}
