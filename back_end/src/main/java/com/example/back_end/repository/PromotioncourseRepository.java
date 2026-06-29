package com.example.back_end.repository;

import com.example.back_end.entity.Promotioncours;
import com.example.back_end.entity.PromotioncoursId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface PromotioncourseRepository extends JpaRepository<Promotioncours, PromotioncoursId> {

    @Query("SELECT pc FROM Promotioncours pc JOIN FETCH pc.promotion JOIN FETCH pc.course c WHERE c.instructor.id = :instructorId")
    List<Promotioncours> findByInstructorId(@Param("instructorId") Long instructorId);

    Optional<Promotioncours> findByCourse_Id(Long courseId);

    Optional<Promotioncours> findByPromotion_Id(Long promotionId);

    @Query("SELECT pc FROM Promotioncours pc JOIN FETCH pc.promotion p WHERE pc.course.id IN :courseIds AND p.startDate <= :now AND p.endDate >= :now")
    List<Promotioncours> findActivePromotionsByCourseIds(@Param("courseIds") List<Long> courseIds, @Param("now") Instant now);
}
