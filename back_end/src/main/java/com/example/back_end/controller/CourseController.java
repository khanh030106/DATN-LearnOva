package com.example.back_end.controller;

import com.example.back_end.dto.response.CreateDraftCourseResponse;
import com.example.back_end.dto.response.GetFileUrlResponse;
import com.example.back_end.dto.response.TeacherCoursesResponse;
import com.example.back_end.dto.resquest.CreateDraftCourseRequest;
import com.example.back_end.service.CourseService;
import com.example.back_end.service.S3Service;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final S3Service s3Service;

    @PostMapping("/create-draft-course")   //  /create/draft
    public CreateDraftCourseResponse createDraftCourse(
            @Valid @RequestBody CreateDraftCourseRequest request,
            Authentication authentication
    ) {
        Long courseId = courseService.createDraftCourse(
                request,
                authentication.getName()
        );

        return new CreateDraftCourseResponse(courseId);
    }

    @GetMapping("/video-url")            //  /video/url
    public GetFileUrlResponse getVideoUrl(
            @RequestParam String fileKey
    ) {
        String url = s3Service.generatePresignedGetUrl(fileKey);

        return new GetFileUrlResponse(url);
    }

    @GetMapping("/my-courses")          // /courses/mine
    public List<TeacherCoursesResponse> getMyCourses(
            Authentication authentication
    ) {
        return courseService.getMyCourses(
                authentication.getName()
        );
    }

}
