package com.example.back_end.repository;

import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.enums.HlsStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findBySectionCourseId(Long courseId);
    long countBySectionCourseId(Long courseId);
    List<Lesson> findBySectionIdOrderByLessonOrderAsc(Long sectionId);
    Optional<Lesson> findByVideoKey(String videoKey);
    List<Lesson> findByHlsStatusIn(List<HlsStatus> statuses);
    List<Lesson> findByVideoKeyIsNotNullAndHlsStatusIsNull();
}
