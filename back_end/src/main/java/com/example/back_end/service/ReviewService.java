package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateReviewRequest;
import com.example.back_end.dto.response.ReviewResponse;
import com.example.back_end.dto.response.RatingSummaryResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Review;
import com.example.back_end.entity.User;
import com.example.back_end.repository.ReviewRepository;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.admin.AdminCourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.back_end.dto.resquest.UpdateReviewRequest;
import java.time.Instant;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final AdminCourseRepository adminCourseRepository;

    public ReviewResponse createReview(
            Long userId,
            CreateReviewRequest request
    ) {
        if (reviewRepository.findByUserIdAndCourseId(
                userId,
                request.getCourseId()
        ).isPresent()) {
            throw new RuntimeException("You have already reviewed this course");
        }
        // 1. Kiểm tra User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("LỖI: Không tìm thấy người dùng với ID = " + userId));
        Course course = adminCourseRepository.findById(request.getCourseId())
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
    public ReviewResponse updateReview(Long userId, UpdateReviewRequest request) {

        if (request == null || request.getReviewId() == null) {
            System.out.println("[ERROR] Request hoặc reviewId bị NULL từ Frontend gửi lên!");
            throw new RuntimeException("Review ID cannot be null");
        }
        // 1. Tìm review trong DB dựa vào ID gửi lên
        Review review = reviewRepository.findById(request.getReviewId())
                .orElseThrow(() -> {
                    System.out.println("[ERROR] Không tìm thấy Review nào trong DB với ID = " + request.getReviewId());
                    return new RuntimeException("Review not found");
                });
        if (!review.getUser().getId().equals(userId)) {
            throw new RuntimeException("You cannot update this review");
        }
        // 3. Cập nhật dữ liệu mới
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUpdatedAt(Instant.now());
        // 4. Lưu lại vào DB
        reviewRepository.save(review);
        return ReviewResponse.builder()
                .reviewId(review.getId())
                .userId(userId)
                .userName(review.getUser().getFullName())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
    public void deleteReview(Long userId, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> {
                    return new RuntimeException("Review not found");
                });
        if (!review.getUser().getId().equals(userId)) {
            System.out.println("NOT OWNER - BLOCK DELETE");
            throw new RuntimeException("You cannot delete this review");
        }
        reviewRepository.delete(review);
    }
    public RatingSummaryResponse getRatingSummary(Long courseId) {
        List<Review> reviews = reviewRepository.findByCourseId(courseId);
        if (reviews.isEmpty()) {
            return new RatingSummaryResponse(0, 0);
        }
        double avg = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0);

        long total = reviews.size();
        return new RatingSummaryResponse(avg, total);
    }
}