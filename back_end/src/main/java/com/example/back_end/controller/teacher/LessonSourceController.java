package com.example.back_end.controller.teacher;

import com.example.back_end.dto.request.teacher.CreateLessonSourceRequest;
import com.example.back_end.dto.response.teacher.LessonSourceResponse;
import com.example.back_end.service.teacher.LessonSourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/teacher/courses")
@PreAuthorize("hasRole('TEACHER')")
public class LessonSourceController {

    private final LessonSourceService lessonSourceService;

    @PostMapping("/lessons/{lessonId}/sources")
    public LessonSourceResponse createLessonSource(
            @PathVariable Long lessonId,
            @RequestBody CreateLessonSourceRequest request,
            Authentication authentication
    ) {
        return lessonSourceService.createLessonSource(lessonId, request, authentication.getName());
    }

    @GetMapping("/lessons/{lessonId}/sources")
    public List<LessonSourceResponse> getLessonSources(@PathVariable Long lessonId, Authentication authentication) {
        return lessonSourceService.getLessonSources(lessonId, authentication.getName());
    }

    @DeleteMapping("/lessons/sources/{sourceId}")
    public void deleteLessonSource(@PathVariable Long sourceId, Authentication authentication) {
        lessonSourceService.deleteLessonSource(sourceId, authentication.getName());
    }
}
