package com.example.back_end.controller;

import com.example.back_end.dto.response.CourseResponse;
import com.example.back_end.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses() {
        List<CourseResponse> courses = courseService.getPublishedCourses();
        return ResponseEntity.ok(courses);
    }
}
