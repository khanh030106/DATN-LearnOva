package com.example.back_end.dto.response.teacher;

import java.time.Instant;

public record TeacherQuestionResponse(
        Long id,
        String content,
        Long courseId,
        String courseTitle,
        Long lessonId,
        String lessonTitle,
        Long userId,
        String userName,
        Instant createdAt,
        Boolean isSolved,
        Boolean isPinned,
        Integer answerCount
) {
}
