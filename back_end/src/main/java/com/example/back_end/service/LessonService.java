package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateLessonRequest;
import com.example.back_end.dto.resquest.UpdateLessonRequest;
import com.example.back_end.dto.resquest.UpdateLessonVideoRequest;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.Section;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@Transactional
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final SectionRepository sectionRepository;

    @Transactional
    public Long createLesson(
            Long sectionId,
            CreateLessonRequest request
    ) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow();

        Lesson lesson = new Lesson();

        lesson.setSection(section);
        lesson.setTitle(request.title());
        lesson.setLessonOrder(Double.valueOf(request.lessonOrder()));
        lesson.setIsPreview(request.isPreview());
        
        // Set default values for required fields
        lesson.setCreatedAt(Instant.now());
        lesson.setUpdatedAt(Instant.now());
        lesson.setIsDeleted(false);
        lesson.setViewCount(0);

        lessonRepository.save(lesson);

        return lesson.getId();
    }

    @Transactional
    public void updateLesson(Long lessonId, UpdateLessonRequest request) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow();

        lesson.setTitle(request.title());
        lesson.setUpdatedAt(Instant.now());
        lessonRepository.save(lesson);
    }

    @Transactional
    public void updateLessonVideo(Long lessonId, UpdateLessonVideoRequest request) {
        System.out.println("=== UPDATE LESSON VIDEO DEBUG ===");
        System.out.println("Lesson ID: " + lessonId);
        System.out.println("Request: " + request);
        
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        System.out.println("Before update - Video Key: " + lesson.getVideoKey());
        
        lesson.setVideoKey(request.videoKey());
        lesson.setVideoOriginalFilename(request.videoOriginalFilename());
        lesson.setVideoContentType(request.videoContentType());
        lesson.setVideoSizeBytes(request.videoSizeBytes());
        
        if (request.durationSeconds() != null) {
            lesson.setDurationSeconds(request.durationSeconds());
        }
        
        lesson.setUpdatedAt(Instant.now());
        
        System.out.println("After setting - Video Key: " + lesson.getVideoKey());
        System.out.println("After setting - Original Filename: " + lesson.getVideoOriginalFilename());
        System.out.println("After setting - Content Type: " + lesson.getVideoContentType());
        System.out.println("After setting - Size Bytes: " + lesson.getVideoSizeBytes());
        
        lessonRepository.save(lesson);
        
        System.out.println("✅ Lesson video updated and saved");
    }

}
