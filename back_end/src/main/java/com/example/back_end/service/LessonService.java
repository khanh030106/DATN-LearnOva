package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateLessonRequest;
import com.example.back_end.dto.resquest.UpdateLessonRequest;
import com.example.back_end.dto.resquest.UpdateLessonVideoRequest;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.Section;
import com.example.back_end.entity.enums.HlsStatus;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final SectionRepository sectionRepository;
    private final MediaConvertService mediaConvertService;

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
        log.debug("updateLessonVideo called, lessonId={}, request={}", lessonId, request);

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        lesson.setVideoKey(request.videoKey());
        lesson.setVideoOriginalFilename(request.videoOriginalFilename());
        lesson.setVideoContentType(request.videoContentType());
        lesson.setVideoSizeBytes(request.videoSizeBytes());

        if (request.durationSeconds() != null) {
            lesson.setDurationSeconds(request.durationSeconds());
        }

        lesson.setUpdatedAt(Instant.now());

        if (request.videoKey() != null) {
            String jobId = mediaConvertService.createHlsJob(request.videoKey(), lessonId);
            lesson.setMediaConvertJobId(jobId);
            lesson.setHlsStatus(HlsStatus.PENDING);
        }

        lessonRepository.save(lesson);

        log.debug("updateLessonVideo complete, lessonId={}", lessonId);
    }

}
