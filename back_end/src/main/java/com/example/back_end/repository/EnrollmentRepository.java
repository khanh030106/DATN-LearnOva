package com.example.back_end.repository;

import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.EnrollmentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {

    @Query("SELECT e FROM Enrollment e WHERE e.course.id IN :courseIds")
    List<Enrollment> findByCourseIdIn(@Param("courseIds") List<Long> courseIds);

    @Query("SELECT e FROM Enrollment e " +
            "JOIN FETCH e.course c " +
            "JOIN FETCH c.instructor " +
            "WHERE e.user.id = :userId " +
            "ORDER BY e.enrolledAt DESC")
    List<Enrollment> findByUserIdWithCourseAndInstructor(@Param("userId") Long userId);

    boolean existsByIdCourseIdAndIdUserId(Long courseId, Long userId);
}
