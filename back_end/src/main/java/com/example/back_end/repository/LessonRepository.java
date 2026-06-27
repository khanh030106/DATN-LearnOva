package com.example.back_end.repository;

import com.example.back_end.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findBySectionCourseId(Long courseId);
}
