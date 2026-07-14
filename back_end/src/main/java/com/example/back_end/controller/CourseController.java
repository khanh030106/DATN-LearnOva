package com.example.back_end.controller;

import com.example.back_end.dto.response.CategoryOptionResponse;
import com.example.back_end.dto.response.CourseDetailResponse;
import com.example.back_end.dto.response.CreateDraftCourseResponse;
import com.example.back_end.dto.response.FeaturedCourseResponse;
import com.example.back_end.dto.response.GetFileUrlResponse;
import com.example.back_end.dto.response.PublicCourseResponse;
import com.example.back_end.dto.response.teacher.TeacherCoursesResponse;
import com.example.back_end.dto.response.teacher.TeacherReviewResponse;
import com.example.back_end.dto.response.teacher.TeacherStudentResponse;
import com.example.back_end.dto.response.TopCategoryResponse;
import com.example.back_end.dto.request.CreateDraftCourseRequest;
import com.example.back_end.dto.request.ReplyReviewRequest;
import com.example.back_end.dto.request.UpdateCourseRequest;
import com.example.back_end.dto.request.UpdateCourseStatusRequest;
import com.example.back_end.service.CourseService;
import com.example.back_end.service.S3Service;
import com.example.back_end.service.admin.AdminCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final S3Service s3Service;
    private final AdminCategoryService categoryService;

    @PreAuthorize("hasRole('TEACHER')")
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
        String hlsMasterPath = courseService.getHlsMasterPlaylistPathIfReady(fileKey);
        String url = hlsMasterPath != null
                ? ServletUriComponentsBuilder.fromCurrentContextPath().path(hlsMasterPath).toUriString()
                : s3Service.generateCloudFrontSignedUrl(fileKey);

        return new GetFileUrlResponse(url);
    }

    @GetMapping("/categories")
    public List<CategoryOptionResponse> getActiveCategories() {
        return categoryService.getActiveCategories();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PatchMapping("/{courseId}/status")
    public ResponseEntity<Void> updateCourseStatus(
            @PathVariable Long courseId,
            @Valid @RequestBody UpdateCourseStatusRequest request,
            Authentication authentication
    ) {
        courseService.updateCourseStatus(courseId, authentication.getName(), request.status());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/featured")
    public ResponseEntity<List<FeaturedCourseResponse>> getFeaturedCourses() {
        return ResponseEntity.ok(courseService.getFeaturedCourses());
    }

    @GetMapping("/top-categories")
    public ResponseEntity<List<TopCategoryResponse>> getTopCategories() {
        return ResponseEntity.ok(courseService.getTopCategories());
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDetailResponse> getCourseDetail(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getCourseDetail(courseId));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/my-students")
    public ResponseEntity<List<TeacherStudentResponse>> getMyStudents(Authentication authentication) {
        return ResponseEntity.ok(courseService.getMyStudents(authentication.getName()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/my-reviews")
    public ResponseEntity<List<TeacherReviewResponse>> getMyReviews(Authentication authentication) {
        return ResponseEntity.ok(courseService.getMyReviews(authentication.getName()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PatchMapping("/reviews/{reviewId}/reply")
    public ResponseEntity<Void> replyToReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody ReplyReviewRequest request,
            Authentication authentication
    ) {
        courseService.replyToReview(reviewId, authentication.getName(), request.getReply());
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/my-courses")          // /courses/mine
    public ResponseEntity<List<TeacherCoursesResponse>> getMyCourses(
            Authentication authentication
    ) {
        return ResponseEntity.ok(courseService.getMyCourses(authentication.getName()));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PutMapping("/{courseId}")
    public ResponseEntity<Void> updateCourse(
            @PathVariable Long courseId,
            @Valid @RequestBody UpdateCourseRequest request,
            Authentication authentication
    ) {
        courseService.updateCourse(courseId, request, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PatchMapping("/{courseId}/visibility")
    public ResponseEntity<Void> toggleCourseVisibility(
            @PathVariable Long courseId,
            Authentication authentication
    ) {
        courseService.toggleCourseVisibility(courseId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> softDeleteCourse(
            @PathVariable Long courseId,
            Authentication authentication
    ) {
        courseService.softDeleteCourse(courseId, authentication.getName());
        return ResponseEntity.noContent().build();
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
