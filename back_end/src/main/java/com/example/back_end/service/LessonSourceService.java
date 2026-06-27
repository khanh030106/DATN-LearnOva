package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateLessonSourceRequest;
import com.example.back_end.dto.response.LessonSourceResponse;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.Lessonsource;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.LessonsourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LessonSourceService {

    private final LessonsourceRepository lessonsourceRepository;
    private final LessonRepository lessonRepository;

    @Transactional
    public LessonSourceResponse createLessonSource(Long lessonId, CreateLessonSourceRequest request) {
        System.out.println("=== CREATE LESSON SOURCE DEBUG ===");
        System.out.println("Lesson ID: " + lessonId);
        System.out.println("Request: " + request);
        
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Lessonsource lessonSource = new Lessonsource();
        lessonSource.setLesson(lesson);
        lessonSource.setFileKey(request.fileKey());
        lessonSource.setOriginalFileName(request.originalFileName());
        lessonSource.setFileName(request.originalFileName()); // Copy to file_name as well
        lessonSource.setContentType(request.contentType());
        lessonSource.setFileSizeBytes(request.fileSizeBytes());
        lessonSource.setResourceType(request.resourceType());
        lessonSource.setCreatedAt(Instant.now());

        System.out.println("Before save - File Key: " + lessonSource.getFileKey());
        System.out.println("Before save - Original Filename: " + lessonSource.getOriginalFileName());
        System.out.println("Before save - Content Type: " + lessonSource.getContentType());
        System.out.println("Before save - File Size: " + lessonSource.getFileSizeBytes());
        
        lessonsourceRepository.save(lessonSource);
        
        System.out.println("✅ Lesson source saved with ID: " + lessonSource.getId());

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
