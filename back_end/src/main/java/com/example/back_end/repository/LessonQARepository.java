package com.example.back_end.repository;

import com.example.back_end.entity.LessonQA;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonQARepository extends JpaRepository<LessonQA, Long> {

    List<LessonQA> findByLesson_IdAndParentIsNull(Long lessonId);

    List<LessonQA> findByParent_IdIn(List<Long> parentIds);

    List<LessonQA> findByLesson_Id(Long lessonId);

    List<LessonQA> findByLessonIdAndIsDeletedFalse(Long lessonId);
    List<LessonQA> findByRootId(Long rootId);
}