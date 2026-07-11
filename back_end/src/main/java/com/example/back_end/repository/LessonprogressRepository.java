package com.example.back_end.repository;

import com.example.back_end.entity.LessonProgress;
import com.example.back_end.entity.LessonProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LessonprogressRepository extends JpaRepository<LessonProgress, LessonProgressId> {

    Optional<LessonProgress> findByUserIdAndLessonId(Long userId, Long lessonId);

    @Query("SELECT lp FROM LessonProgress lp WHERE lp.user.id = :userId AND lp.lesson.section.course.id = :courseId")
    List<LessonProgress> findByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);

    @Query("SELECT COUNT(lp) FROM LessonProgress lp WHERE lp.user.id = :userId AND lp.lesson.section.course.id = :courseId AND lp.isCompleted = true")
    long countCompletedLessonsByUserAndCourse(@Param("userId") Long userId, @Param("courseId") Long courseId);
    boolean existsByUserIdAndLessonId(Long userId, Long lessonId);
    boolean existsByUser_IdAndLesson_IdAndIsCompletedTrue(Long userId, Long lessonId);
}
