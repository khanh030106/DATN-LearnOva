package com.example.back_end.repository;

import com.example.back_end.entity.LessonQA;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonQARepository extends JpaRepository<LessonQA, Long> {

    // lấy question theo lesson
    List<LessonQA> findByLessonIdAndParentIsNull(Long lessonId);

    // lấy answer theo list question
    List<LessonQA> findByParentIdIn(List<Long> parentIds);

    // lấy tất cả Q&A theo lesson
    List<LessonQA> findByLessonId(Long lessonId);
}