package com.example.back_end.repository;

import com.example.back_end.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByCourseId(Long courseId);

    Optional<Review> findByUserIdAndCourseId(Long userId, Long courseId);

    @Query("SELECT r FROM Review r JOIN FETCH r.user WHERE r.course.id = :courseId")
    List<Review> findByCourseIdWithUser(@Param("courseId") Long courseId);

    @Query("SELECT r FROM Review r WHERE r.course.id IN :courseIds")
    List<Review> findByCourseIdIn(@Param("courseIds") List<Long> courseIds);
    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Review r WHERE r.course.id = :courseId")
    Double getAverageRating(@Param("courseId") Long courseId);

    long countByCourseId(Long courseId);
}