package com.example.back_end.repository;

import com.example.back_end.entity.Lessonprogress;
import com.example.back_end.entity.LessonprogressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface LessonprogressRepository extends JpaRepository<Lessonprogress, LessonprogressId> {

    Optional<Lessonprogress> findByUserIdAndLessonId(Long userId, Long lessonId);

    @Query("SELECT lp FROM Lessonprogress lp WHERE lp.user.id = :userId AND lp.lesson.section.course.id = :courseId")
    List<Lessonprogress> findByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);

    @Query("SELECT COUNT(lp) FROM Lessonprogress lp WHERE lp.user.id = :userId AND lp.lesson.section.course.id = :courseId AND lp.isCompleted = true")
    long countCompletedLessonsByUserAndCourse(@Param("userId") Long userId, @Param("courseId") Long courseId);
    boolean existsByUserIdAndLessonId(Long userId, Long lessonId);
    boolean existsByUser_IdAndLesson_IdAndIsCompletedTrue(Long userId, Long lessonId);

    @Modifying
    @Transactional
    @Query("""
    UPDATE Lessonprogress lp
    SET lp.isCompleted = false,
        lp.watchedSeconds = 0
    WHERE lp.user.id = :userId
    AND lp.lesson.section.course.id = :courseId
    """)
        void resetCourseProgress(
                @Param("userId") Long userId,
                @Param("courseId") Long courseId
        );
}
