package com.example.back_end.controller;

import com.example.back_end.dto.resquest.CreateReviewRequest;
import com.example.back_end.dto.response.ReviewResponse;
import com.example.back_end.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.back_end.security.CustomUserDetails;
import com.example.back_end.dto.resquest.UpdateReviewRequest;

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
    @PutMapping("/review/update")
    public ReviewResponse updateReview(
            Authentication authentication,
            @RequestBody UpdateReviewRequest request
    ) {
        if (authentication == null) {
            throw new RuntimeException("No authentication");
        }

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return reviewService.updateReview(userDetails.getId(), request);
    }
    @DeleteMapping("/review/{reviewId}")
    public void deleteReview(
            Authentication authentication,
            @PathVariable Long reviewId
    ) {
        System.out.println("=== CONTROLLER DELETE REVIEW START ===");
        System.out.println("reviewId = " + reviewId);

        if (authentication == null) {
            System.out.println("AUTH NULL");
            throw new RuntimeException("No authentication");
        }

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        System.out.println("userId = " + userDetails.getId());
        System.out.println("userEmail = " + userDetails.getUsername());

        reviewService.deleteReview(userDetails.getId(), reviewId);

        System.out.println("=== CONTROLLER DELETE REVIEW END ===");
    }
}