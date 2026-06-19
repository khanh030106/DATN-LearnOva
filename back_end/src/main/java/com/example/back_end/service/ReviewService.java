package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateReviewRequest;
import com.example.back_end.dto.response.ReviewResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Review;
import com.example.back_end.entity.User;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.ReviewRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public ReviewResponse createReview(
            Long userId,
            CreateReviewRequest request
    ) {

        if (reviewRepository.findByUserIdAndCourseId(
                userId,
                request.getCourseId()
        ).isPresent()) {

            throw new RuntimeException(
                    "You have already reviewed this course"
            );
        }

        // 1. Kiểm tra User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("LỖI: Không tìm thấy người dùng với ID = " + userId));

// 2. Kiểm tra Course
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("LỖI: Không tìm thấy khóa học với ID = " + request.getCourseId()));

        Review review = new Review();

        review.setUser(user);
        review.setCourse(course);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(Instant.now());
        review.setUpdatedAt(Instant.now());

        reviewRepository.save(review);

        return ReviewResponse.builder()
                .reviewId(review.getId())
                .userId(user.getId())
                .userName(user.getFullName())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }

    public List<ReviewResponse> getCourseReviews(
            Long courseId
    ) {
        return reviewRepository.findByCourseId(courseId)
                .stream()
                .map(review ->
                        ReviewResponse.builder()
                                .reviewId(review.getId())
                                .userId(review.getUser().getId())
                                .userName(review.getUser().getFullName())
                                .rating(review.getRating())
                                .comment(review.getComment())
                                .createdAt(review.getCreatedAt())
                                .build()
                )
                .toList();
    }
}