package com.example.back_end.repository;

import com.example.back_end.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByInstructorIdAndIsDeletedFalseOrderByCreatedAtDesc(Long instructorId);

}
