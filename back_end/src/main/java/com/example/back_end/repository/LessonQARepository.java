package com.example.back_end.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.back_end.entity.LessonQA;

public interface LessonQARepository extends JpaRepository<LessonQA, Long> {

    List<LessonQA> findByLesson_IdAndParentIsNull(Long lessonId);

    List<LessonQA> findByParent_IdIn(List<Long> parentIds);

    List<LessonQA> findByLesson_Id(Long lessonId);

    List<LessonQA> findByLessonIdAndIsDeletedFalse(Long lessonId);
    List<LessonQA> findByRootId(Long rootId);

    @Query("SELECT q FROM LessonQA q JOIN FETCH q.user WHERE q.lesson.section.course.id = :courseId AND q.parent IS NULL")
    List<LessonQA> findQuestionsForCourseWithUser(@Param("courseId") Long courseId);

    @Query("SELECT a FROM LessonQA a JOIN FETCH a.user WHERE a.parent.id IN :parentIds")
    List<LessonQA> findAnswersByParentIdsWithUser(@Param("parentIds") List<Long> parentIds);
}