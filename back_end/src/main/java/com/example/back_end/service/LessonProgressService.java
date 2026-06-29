package com.example.back_end.service;

import com.example.back_end.dto.response.CourseProgressResponse;
import com.example.back_end.dto.response.LessonProgressResponse;
import com.example.back_end.dto.resquest.UpdateLessonProgressRequest;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.Lessonprogress;
import com.example.back_end.entity.LessonprogressId;
import com.example.back_end.entity.User;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.LessonprogressRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LessonProgressService {

    private final LessonprogressRepository lessonprogressRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;

    @Transactional
    public CourseProgressResponse updateProgress(Long userId, UpdateLessonProgressRequest request) {
        Lesson lesson = lessonRepository.findById(request.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + request.getLessonId()));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        LessonprogressId id = new LessonprogressId();
        id.setUserId(userId);
        id.setLessonId(request.getLessonId());

        Lessonprogress progress = lessonprogressRepository.findById(id).orElseGet(() -> {
            Lessonprogress newProgress = new Lessonprogress();
            newProgress.setId(id);
            newProgress.setUser(user);
            newProgress.setLesson(lesson);
            newProgress.setIsCompleted(false);
            newProgress.setWatchedSeconds(0);
            return newProgress;
        });

        int currentWatched = progress.getWatchedSeconds() != null ? progress.getWatchedSeconds() : 0;
        int newWatched = Math.max(currentWatched, request.getWatchedSeconds());
        progress.setWatchedSeconds(newWatched);

        int duration = lesson.getDurationSeconds() != null && lesson.getDurationSeconds() > 0
                ? lesson.getDurationSeconds()
                : 0;

        if (duration > 0) {
            double percent = ((double) newWatched / duration) * 100.0;
            if (percent >= 95.0) {
                progress.setIsCompleted(true);
            }
        }

        lessonprogressRepository.save(progress);

        Long courseId = lesson.getSection().getCourse().getId();
        return getCourseProgress(userId, courseId);
    }

    public CourseProgressResponse getCourseProgress(Long userId, Long courseId) {
        List<Lesson> lessons = lessonRepository.findBySectionCourseId(courseId);
        List<Lessonprogress> progressList = lessonprogressRepository.findByUserIdAndCourseId(userId, courseId);

        List<LessonProgressResponse> lessonResponses = lessons.stream().map(lesson -> {
            Lessonprogress lp = progressList.stream()
                    .filter(p -> p.getLesson().getId().equals(lesson.getId()))
                    .findFirst()
                    .orElse(null);

            int watched = lp != null && lp.getWatchedSeconds() != null ? lp.getWatchedSeconds() : 0;
            boolean completed = lp != null && Boolean.TRUE.equals(lp.getIsCompleted());
            int duration = lesson.getDurationSeconds() != null && lesson.getDurationSeconds() > 0 ? lesson.getDurationSeconds() : 0;
            double percent = duration > 0 ? Math.min(100.0, ((double) watched / duration) * 100.0) : (completed ? 100.0 : 0.0);

            return LessonProgressResponse.builder()
                    .lessonId(lesson.getId())
                    .watchedSeconds(watched)
                    .isCompleted(completed)
                    .progressPercent(percent)
                    .build();
        }).toList();

        long completedCount = lessonResponses.stream().filter(LessonProgressResponse::getIsCompleted).count();
        long totalCount = lessons.size();
        double coursePercent = totalCount > 0 ? ((double) completedCount / totalCount) * 100.0 : 0.0;
        boolean isCourseCompleted = totalCount > 0 && completedCount == totalCount;

        return CourseProgressResponse.builder()
                .courseId(courseId)
                .completedLessonsCount(completedCount)
                .totalLessonsCount(totalCount)
                .courseProgressPercent(coursePercent)
                .isCourseCompleted(isCourseCompleted)
                .lessonProgresses(lessonResponses)
                .build();
    }
}
