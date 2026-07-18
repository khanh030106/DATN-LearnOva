package com.example.back_end.controller;

import com.example.back_end.dto.response.LessonSummaryResponse;
import com.example.back_end.service.LessonSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learnova/lessons")
@RequiredArgsConstructor
public class LessonSummaryController {

    private final LessonSummaryService lessonSummaryService;

    @GetMapping("/{lessonId}/summary")
    public ResponseEntity<LessonSummaryResponse> getSummary(@PathVariable Long lessonId) {
        return ResponseEntity.ok(lessonSummaryService.getSummary(lessonId));
    }

    @PostMapping("/{lessonId}/summary")
    public ResponseEntity<LessonSummaryResponse> generateSummary(@PathVariable Long lessonId) {
        return ResponseEntity.ok(lessonSummaryService.generateSummary(lessonId));
    }
}
