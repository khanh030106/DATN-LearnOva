package com.example.back_end.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.back_end.entity.Enrollment;
import com.example.back_end.entity.EnrollmentId;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {

    @Query("SELECT e FROM Enrollment e WHERE e.course.id IN :courseIds")
    List<Enrollment> findByCourseIdIn(@Param("courseIds") List<Long> courseIds);

    @Query("SELECT e FROM Enrollment e " +
            "JOIN FETCH e.course c " +
            "JOIN FETCH c.instructor " +
            "WHERE e.user.id = :userId " +
            "ORDER BY e.enrolledAt DESC")
    List<Enrollment> findByUserIdWithCourseAndInstructor(@Param("userId") Long userId);

    @Query("SELECT COUNT(e) > 0 FROM Enrollment e " +
            "WHERE e.user.email = :email AND e.course.id = :courseId")
    boolean existsByUserEmailAndCourseId(
            @Param("email") String email,
            @Param("courseId") Long courseId
    );

    boolean existsByIdCourseIdAndIdUserId(Long courseId, Long userId);

    @Query("SELECT e FROM Enrollment e " +
           "JOIN FETCH e.user u " +
           "JOIN FETCH e.course c " +
           "WHERE c.instructor.id = :instructorId " +
           "ORDER BY e.enrolledAt DESC")
    List<Enrollment> findByInstructorId(@Param("instructorId") Long instructorId);

    @Query("SELECT COUNT(e) > 0 FROM Enrollment e WHERE e.user.id = :userId AND e.course.id = :courseId")
    boolean existsByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.id = :courseId")
    long countByCourseId(@Param("courseId") Long courseId);
}