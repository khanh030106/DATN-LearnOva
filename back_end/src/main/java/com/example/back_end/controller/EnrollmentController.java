package com.example.back_end.controller;

import com.example.back_end.dto.response.MyEnrolledCourseResponse;
import com.example.back_end.service.EnrollmentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @GetMapping("/my-courses")
    public List<MyEnrolledCourseResponse> getMyEnrolledCourses() {
        return enrollmentService.getMyEnrolledCourses();
    }
}
