package com.example.back_end.repository;

import com.example.back_end.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("""
            SELECT DISTINCT c FROM Course c
            LEFT JOIN FETCH c.sections s
            LEFT JOIN FETCH s.lessons
            LEFT JOIN FETCH c.coursecategories cc
            LEFT JOIN FETCH cc.category
            WHERE c.instructor.id = :instructorId AND c.isDeleted = false
            ORDER BY c.createdAt DESC
            """)
    List<Course> findByInstructorIdAndIsDeletedFalseOrderByCreatedAtDesc(@Param("instructorId") Long instructorId);

}
