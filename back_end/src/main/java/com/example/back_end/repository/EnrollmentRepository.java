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

    @Query("SELECT COUNT(e) > 0 FROM Enrollment e WHERE e.user.email = :email AND e.course.id = :courseId")
    boolean existsByUserEmailAndCourseId(@Param("email") String email, @Param("courseId") Long courseId);
}
