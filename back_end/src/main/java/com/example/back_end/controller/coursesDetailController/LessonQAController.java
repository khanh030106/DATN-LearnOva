package com.example.back_end.controller.coursesDetailController;

import com.example.back_end.dto.resquest.CreateAnswerRequest;
import com.example.back_end.dto.resquest.CreateQuestionRequest;
import com.example.back_end.dto.response.LessonQAResponse;
import com.example.back_end.security.CustomUserDetails;
import com.example.back_end.service.LessonQAService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learnova")
@RequiredArgsConstructor
public class LessonQAController {

    private final LessonQAService qaService;

    // ======================
    // GET Q&A LESSON
    // ======================
    @GetMapping("/qna/lesson/{lessonId}")
    public LessonQAResponse getLessonQnA(@PathVariable Long lessonId) {
        return qaService.getLessonQnA(lessonId);
    }

    // ======================
    // CREATE QUESTION
    // ======================
    @PostMapping("/qna/question")
    public void createQuestion(
            Authentication auth,
            @RequestBody CreateQuestionRequest req
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.createQuestion(user.getId(), req);
    }

    // ======================
    // CREATE ANSWER
    // ======================
    @PostMapping("/qna/answer")
    public void createAnswer(
            Authentication auth,
            @RequestBody CreateAnswerRequest req
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.createAnswer(user.getId(), req);
    }
}