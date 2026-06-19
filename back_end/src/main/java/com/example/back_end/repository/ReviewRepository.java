package com.example.back_end.repository;

import com.example.back_end.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByCourseId(Long courseId);

    Optional<Review> findByUserIdAndCourseId(Long userId, Long courseId);
}