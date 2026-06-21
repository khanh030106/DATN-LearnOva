package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateReviewRequest;
import com.example.back_end.dto.response.ReviewResponse;
import com.example.back_end.dto.response.RatingSummaryResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Review;
import com.example.back_end.entity.User;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.ReviewRepository;
import com.example.back_end.repository.UserRepository;
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
    private final CourseRepository courseRepository;

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
    public ReviewResponse updateReview(Long userId, UpdateReviewRequest request) {
        System.out.println("==================================================");
        System.out.println("=== [SERVICE] START UPDATE REVIEW ===");
        System.out.println("-> ID Người dùng đang đăng nhập (userId): " + userId);
        System.out.println("-> Request ID Review cần sửa (reviewId): " + (request != null ? request.getReviewId() : "null"));
        System.out.println("-> Request Rating mới: " + (request != null ? request.getRating() : "null"));
        System.out.println("-> Request Comment mới: " + (request != null ? request.getComment() : "null"));
        System.out.println("==================================================");

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

        System.out.println("[INFO] Tìm thấy Review thành công trong Database!");
        System.out.println("-> ID chủ sở hữu thực sự của Review này (trong DB): " + review.getUser().getId());
        System.out.println("-> Tên chủ sở hữu: " + review.getUser().getFullName());

        // 2. Kiểm tra xem người đang đăng nhập có phải là chủ sở hữu của review này không
        if (!review.getUser().getId().equals(userId)) {
            System.out.println("[WARNING] CHẶN CẬP NHẬT: Người dùng (ID: " + userId + ") KHÔNG PHẢI là chủ sở hữu của Review này (ID chủ: " + review.getUser().getId() + ")");
            throw new RuntimeException("You cannot update this review");
        }

        System.out.println("[INFO] Xác thực chính chủ thành công! Tiến hành cập nhật dữ liệu...");

        // 3. Cập nhật dữ liệu mới
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUpdatedAt(Instant.now());

        // 4. Lưu lại vào DB
        reviewRepository.save(review);
        System.out.println("[SUCCESS] Đã lưu dữ liệu Review mới vào Database thành công!");
        System.out.println("=== [SERVICE] END UPDATE REVIEW ===");
        System.out.println("==================================================");

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

        System.out.println("=== SERVICE DELETE REVIEW START ===");
        System.out.println("userId = " + userId);
        System.out.println("reviewId = " + reviewId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> {
                    System.out.println("REVIEW NOT FOUND");
                    return new RuntimeException("Review not found");
                });

        System.out.println("FOUND REVIEW: " + review.getId());
        System.out.println("OWNER USER ID: " + review.getUser().getId());

        if (!review.getUser().getId().equals(userId)) {
            System.out.println("NOT OWNER - BLOCK DELETE");
            throw new RuntimeException("You cannot delete this review");
        }

        reviewRepository.delete(review);

        System.out.println("REVIEW DELETED SUCCESSFULLY");

        System.out.println("=== SERVICE DELETE REVIEW END ===");
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