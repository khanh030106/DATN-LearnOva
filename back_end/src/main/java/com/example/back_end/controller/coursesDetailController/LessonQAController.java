package com.example.back_end.controller.coursesDetailController;

import com.example.back_end.dto.resquest.CreateAnswerRequest;
import com.example.back_end.dto.resquest.CreateQuestionRequest;
import com.example.back_end.dto.response.LessonQAResponse;
import com.example.back_end.security.CustomUserDetails;
import com.example.back_end.service.LessonQAService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LessonQAController {

    private final LessonQAService qaService;

    // ======================
    // GET Q&A BY COURSE
    // New API: /api/qna/course/{courseId}
    // ======================
    @GetMapping("/qna/course/{courseId}")
    public LessonQAResponse getCourseQnA(@PathVariable Long courseId) {
        return qaService.getCourseQnA(courseId);
    }

    // ======================
    // GET Q&A BY LESSON
    // Old API: /api/learnova/qna/lesson/{lessonId}
    // ======================
    @GetMapping("/learnova/qna/lesson/{lessonId}")
    public LessonQAResponse getLessonQnA(@PathVariable Long lessonId) {
        return qaService.getLessonQnA(lessonId);
    }

    // ======================
    // CREATE QUESTION
    // Supports:
    // /api/qna/question
    // /api/learnova/qna/question
    // ======================
    @PostMapping({
            "/qna/question",
            "/learnova/qna/question"
    })
    public void createQuestion(
            Authentication auth,
            @Valid @RequestBody CreateQuestionRequest req
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.createQuestion(user.getId(), req);
    }

    // ======================
    // CREATE ANSWER
    // Supports:
    // /api/qna/answer
    // /api/learnova/qna/answer
    // ======================
    @PostMapping({
            "/qna/answer",
            "/learnova/qna/answer"
    })
    public void createAnswer(
            Authentication auth,
            @Valid @RequestBody CreateAnswerRequest req
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.createAnswer(user.getId(), req);
    }

    // ======================
    // DELETE ANSWER
    // Supports:
    // /api/qna/answer/{answerId}
    // /api/learnova/qna/answer/{answerId}
    // ======================
    @DeleteMapping({
            "/qna/answer/{answerId}",
            "/learnova/qna/answer/{answerId}"
    })
    public void deleteAnswer(
            Authentication auth,
            @PathVariable Long answerId
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.deleteAnswer(user.getId(), answerId);
    }

    // ======================
    // DELETE QUESTION
    // Supports:
    // /api/qna/question/{questionId}
    // /api/learnova/qna/question/{questionId}
    // ======================
    @DeleteMapping({
            "/qna/question/{questionId}",
            "/learnova/qna/question/{questionId}"
    })
    public void deleteQuestion(
            Authentication auth,
            @PathVariable Long questionId
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.deleteQuestion(user.getId(), questionId);
    }

    // ======================
    // UPDATE ANSWER
    // Supports:
    // /api/qna/answer/{id}
    // /api/learnova/qna/answer/{id}
    // ======================
    @PutMapping({
            "/qna/answer/{id}",
            "/learnova/qna/answer/{id}"
    })
    public void updateAnswer(
            Authentication auth,
            @PathVariable Long id,
            @Valid @RequestBody CreateAnswerRequest req
    ) {
        System.out.println("UPDATE CONTROLLER");
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.updateAnswer(user.getId(), id, req);
    }

    // ======================
    // UPDATE QUESTION
    // Supports:
    // /api/qna/question/{id}
    // /api/learnova/qna/question/{id}
    // ======================
    @PutMapping({
            "/qna/question/{id}",
            "/learnova/qna/question/{id}"
    })
    public void updateQuestion(
            Authentication auth,
            @PathVariable Long id,
            @Valid @RequestBody CreateQuestionRequest req
    ) {
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        qaService.updateQuestion(user.getId(), id, req);
    }
}