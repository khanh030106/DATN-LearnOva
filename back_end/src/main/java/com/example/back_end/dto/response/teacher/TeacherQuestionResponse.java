package com.example.back_end.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class TeacherQuestionResponse {
    private Long id;
    private String content;

    private Long courseId;
    private String courseTitle;

    private Long lessonId;
    private String lessonTitle;

    private Long userId;
    private String userName;

    private Instant createdAt;

    private Boolean isSolved;
    private Boolean isPinned;
    private Integer answerCount;
}
