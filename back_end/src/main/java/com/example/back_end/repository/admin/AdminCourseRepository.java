package com.example.back_end.repository.admin;

import com.example.back_end.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdminCourseRepository extends JpaRepository<Course, Long> {

}