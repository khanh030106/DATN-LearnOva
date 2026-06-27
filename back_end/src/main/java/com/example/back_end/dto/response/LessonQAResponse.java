package com.example.back_end.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class LessonQAResponse {
    private Long lessonId;
    private String lessonTitle;

    private List<QuestionResponse> questions;
}