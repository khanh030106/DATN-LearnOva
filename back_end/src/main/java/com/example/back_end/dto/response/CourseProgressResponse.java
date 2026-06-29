package com.example.back_end.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseProgressResponse {
    private Long courseId;
    private long completedLessonsCount;
    private long totalLessonsCount;
    private double courseProgressPercent;
    private boolean isCourseCompleted;
    private List<LessonProgressResponse> lessonProgresses;
}
