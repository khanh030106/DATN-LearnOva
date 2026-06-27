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
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class LessonQAController {

    private final LessonQAService qaService;

    @GetMapping("/course/{courseId}")
    public LessonQAResponse getCourseQnA(@PathVariable Long courseId) {
        return qaService.getCourseQnA(courseId);
    }

    @PostMapping("/question")  //  /{courseId}/question/**
    public void createQuestion(
            Authentication auth,
            @Valid @RequestBody CreateQuestionRequest req
    ) {
        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        qaService.createQuestion(user.getId(), req);
    }

    @PostMapping("/answer")    //  /{courseId}/answer/**
    public void createAnswer(
            Authentication auth,
            @Valid @RequestBody CreateAnswerRequest req
    ) {
        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        qaService.createAnswer(user.getId(), req);
    }
}