package com.example.back_end.controller;

import com.example.back_end.dto.response.CategoryOptionResponse;
import com.example.back_end.dto.response.CourseDetailResponse;
import com.example.back_end.dto.response.CreateDraftCourseResponse;
import com.example.back_end.dto.response.FeaturedCourseResponse;
import com.example.back_end.dto.response.GetFileUrlResponse;
import com.example.back_end.dto.response.PublicCourseResponse;
import com.example.back_end.dto.response.TeacherCoursesResponse;
import com.example.back_end.dto.resquest.CreateDraftCourseRequest;
import com.example.back_end.dto.resquest.UpdateCourseStatusRequest;
import com.example.back_end.service.CourseService;
import com.example.back_end.service.S3Service;
import com.example.back_end.service.admin.AdminCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final S3Service s3Service;
    private final AdminCategoryService categoryService;

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

    @GetMapping("/categories")
    public List<CategoryOptionResponse> getActiveCategories() {
        return categoryService.getActiveCategories();
    }

    @PatchMapping("/{courseId}/status")
    public ResponseEntity<Void> updateCourseStatus(
            @PathVariable Long courseId,
            @Valid @RequestBody UpdateCourseStatusRequest request,
            Authentication authentication
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        courseService.updateCourseStatus(courseId, authentication.getName(), request.status());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/featured")
    public ResponseEntity<List<FeaturedCourseResponse>> getFeaturedCourses() {
        return ResponseEntity.ok(courseService.getFeaturedCourses());
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDetailResponse> getCourseDetail(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getCourseDetail(courseId));
    }

    @GetMapping("/my-courses")          // /courses/mine
    public ResponseEntity<List<TeacherCoursesResponse>> getMyCourses(
            Authentication authentication
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(courseService.getMyCourses(authentication.getName()));
    }

    @GetMapping("/public")
    public List<PublicCourseResponse> getPublishedCourses() {
        return courseService.getPublishedCourses();
    }

    @GetMapping("/public/{courseId}")
    public PublicCourseResponse getPublishedCourse(@PathVariable Long courseId) {
        return courseService.getPublishedCourse(courseId);
    }

}
