package com.example.back_end.controller;

import com.example.back_end.dto.resquest.CreateReviewRequest;
import com.example.back_end.dto.response.ReviewResponse;
import com.example.back_end.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.back_end.security.CustomUserDetails;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/review/post")
    public ReviewResponse createReview(
            Authentication authentication,
            @RequestBody CreateReviewRequest request
    ) {

        if (authentication == null) {
            throw new RuntimeException("No authentication - missing token or filter failed");
        }

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        Long userId = userDetails.getId();

        return reviewService.createReview(userId, request);
    }

    @GetMapping("/course/{courseId}")
    public List<ReviewResponse> getCourseReviews(
            @PathVariable Long courseId
    ) {
        return reviewService.getCourseReviews(courseId);
    }
}