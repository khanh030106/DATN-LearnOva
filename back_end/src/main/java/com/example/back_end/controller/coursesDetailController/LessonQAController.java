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

        System.out.println("LOGIN USER = " + user.getId());
        System.out.println("LOGIN EMAIL = " + user.getUsername());

        qaService.createAnswer(user.getId(), req);
    }
    @DeleteMapping("/qna/answer/{answerId}")
    public void deleteAnswer(
            Authentication auth,
            @PathVariable Long answerId
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        qaService.deleteAnswer(user.getId(), answerId);
    }
    @DeleteMapping("/qna/question/{questionId}")
    public void deleteQuestion(
            Authentication auth,
            @PathVariable Long questionId
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.deleteQuestion(user.getId(), questionId);
    }
    @PutMapping("/qna/answer/{id}")
    public void updateAnswer(
            Authentication auth,
            @PathVariable Long id,
            @RequestBody CreateAnswerRequest req
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.updateAnswer(user.getId(), id, req);
    }
    @PutMapping("/qna/question/{id}")
    public void updateQuestion(
            Authentication auth,
            @PathVariable Long id,
            @RequestBody CreateQuestionRequest req
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.updateQuestion(user.getId(), id, req);
    }
}