package com.example.back_end.repository.admin;

import com.example.back_end.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AdminCourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT DISTINCT c FROM Course c JOIN FETCH c.instructor LEFT JOIN FETCH c.tags")
    List<Course> findAllWithInstructor();

    @Query("SELECT c FROM Course c JOIN FETCH c.instructor LEFT JOIN FETCH c.tags WHERE c.id = :id")
    Optional<Course> findByIdWithInstructor(@Param("id") Long id);

    @Query("SELECT c FROM Course c WHERE c.instructor.id IN :instructorIds AND c.isDeleted = false")
    List<Course> findByInstructorIdIn(@Param("instructorIds") List<Long> instructorIds);
}
