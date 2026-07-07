package com.example.back_end.controller;

import com.example.back_end.dto.response.CourseCurriculumResponse;
import com.example.back_end.service.CourseCurriculumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.back_end.service.ReviewService;
import com.example.back_end.dto.response.CourseReviewResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/student/courses")
public class CourseCurriculumController {

    private final CourseCurriculumService courseCurriculumService;
    private final ReviewService reviewService;

    @GetMapping("/{courseId}/curriculum")
    public CourseCurriculumResponse getCourseCurriculum(
            @PathVariable Long courseId
    ) {
        return courseCurriculumService.getCourseCurriculum(courseId);
    }
    @GetMapping("/{courseId}/reviews")
    public CourseReviewResponse getCourseReviews(
            @PathVariable Long courseId
    ) {
        return reviewService.getCourseReviewSummary(courseId);
    }
}