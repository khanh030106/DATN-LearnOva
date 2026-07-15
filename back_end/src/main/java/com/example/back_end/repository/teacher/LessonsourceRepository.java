package com.example.back_end.repository.teacher;

import com.example.back_end.entity.Lessonsource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonsourceRepository extends JpaRepository<Lessonsource, Long> {
    List<Lessonsource> findByLessonId(Long lessonId);
}
