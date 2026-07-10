package com.example.back_end.controller;

import com.example.back_end.dto.response.CreateLessonResponse;
import com.example.back_end.dto.resquest.CreateLessonRequest;
import com.example.back_end.dto.resquest.UpdateLessonRequest;
import com.example.back_end.dto.resquest.UpdateLessonVideoRequest;
import com.example.back_end.service.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/courses")
@PreAuthorize("hasRole('TEACHER')")
public class LessonController {

    private final LessonService lessonService;

    @PostMapping("/sections/{sectionId}/lessons")  // /lesson/create
    public CreateLessonResponse createLesson(
            @PathVariable Long sectionId,
            @Valid @RequestBody CreateLessonRequest request
    ) {
        Long lessonId = lessonService.createLesson(
                sectionId,
                request
        );

        return new CreateLessonResponse(lessonId);
    }

    @PutMapping("/lessons/{lessonId}")
    public void updateLesson(
            @PathVariable Long lessonId,
            @RequestBody UpdateLessonRequest request
    ) {
        lessonService.updateLesson(lessonId, request);
    }

    @PutMapping("/lessons/{lessonId}/video")  // /lesson/{lessonId}/up
    public void updateLessonVideo(
            @PathVariable Long lessonId,
            @RequestBody UpdateLessonVideoRequest request
    ) {
        lessonService.updateLessonVideo(lessonId, request);
    }

}
