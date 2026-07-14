package com.example.back_end.controller.teacher;

import com.example.back_end.dto.request.teacher.CreateLessonSourceRequest;
import com.example.back_end.dto.response.teacher.LessonSourceResponse;
import com.example.back_end.service.teacher.LessonSourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
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
            @RequestBody CreateLessonSourceRequest request
    ) {
        return lessonSourceService.createLessonSource(lessonId, request);
    }

    @GetMapping("/lessons/{lessonId}/sources")
    public List<LessonSourceResponse> getLessonSources(@PathVariable Long lessonId) {
        return lessonSourceService.getLessonSources(lessonId);
    }

    @DeleteMapping("/lessons/sources/{sourceId}")
    public void deleteLessonSource(@PathVariable Long sourceId) {
        lessonSourceService.deleteLessonSource(sourceId);
    }
}
