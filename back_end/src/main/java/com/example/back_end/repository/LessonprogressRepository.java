package com.example.back_end.repository;

import com.example.back_end.entity.Lessonprogress;
import com.example.back_end.entity.LessonprogressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LessonprogressRepository extends JpaRepository<Lessonprogress, LessonprogressId> {

    Optional<Lessonprogress> findByUserIdAndLessonId(Long userId, Long lessonId);

    @Query("SELECT lp FROM Lessonprogress lp WHERE lp.user.id = :userId AND lp.lesson.section.course.id = :courseId")
    List<Lessonprogress> findByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);

    @Query("SELECT COUNT(lp) FROM Lessonprogress lp WHERE lp.user.id = :userId AND lp.lesson.section.course.id = :courseId AND lp.isCompleted = true")
    long countCompletedLessonsByUserAndCourse(@Param("userId") Long userId, @Param("courseId") Long courseId);
}
