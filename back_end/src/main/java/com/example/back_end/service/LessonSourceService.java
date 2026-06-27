package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateLessonSourceRequest;
import com.example.back_end.dto.response.LessonSourceResponse;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.Lessonsource;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.LessonsourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LessonSourceService {

    private final LessonsourceRepository lessonsourceRepository;
    private final LessonRepository lessonRepository;

    @Transactional
    public LessonSourceResponse createLessonSource(Long lessonId, CreateLessonSourceRequest request) {
        log.debug("createLessonSource called, lessonId={}, request={}", lessonId, request);

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        Lessonsource lessonSource = new Lessonsource();
        lessonSource.setLesson(lesson);
        lessonSource.setFileKey(request.fileKey());
        lessonSource.setOriginalFileName(request.originalFileName());
        lessonSource.setFileName(request.originalFileName()); // Copy to file_name as well
        lessonSource.setContentType(request.contentType());
        lessonSource.setFileSizeBytes(request.fileSizeBytes());
        lessonSource.setResourceType(request.resourceType());
        lessonSource.setCreatedAt(Instant.now());

        lessonsourceRepository.save(lessonSource);

        log.debug("createLessonSource saved, sourceId={}", lessonSource.getId());

        return new LessonSourceResponse(
                lessonSource.getId(),
                lessonSource.getFileKey(),
                lessonSource.getOriginalFileName(),
                lessonSource.getResourceType()
        );
    }

    @Transactional(readOnly = true)
    public List<LessonSourceResponse> getLessonSources(Long lessonId) {
        return lessonsourceRepository.findByLessonId(lessonId)
                .stream()
                .map(source -> new LessonSourceResponse(
                        source.getId(),
                        source.getFileKey(),
                        source.getOriginalFileName(),
                        source.getResourceType()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteLessonSource(Long sourceId) {
        lessonsourceRepository.deleteById(sourceId);
    }
}
