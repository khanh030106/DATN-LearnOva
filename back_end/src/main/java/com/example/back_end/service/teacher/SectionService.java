package com.example.back_end.service.teacher;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.request.teacher.CreateSectionRequest;
import com.example.back_end.dto.request.teacher.UpdateSectionRequest;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Section;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.SectionRepository;

import lombok.RequiredArgsConstructor;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Transactional
public class SectionService {

    private final CourseRepository courseRepository;
    private final SectionRepository sectionRepository;

    @Transactional
    public Long createSection(
            Long courseId,
            CreateSectionRequest request
    ) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow();

        Section section = new Section();

        section.setCourse(course);
        section.setTitle(request.title());
        section.setSectionOrder(Double.valueOf(request.sectionOrder()));
        
        // Set default values for required fields
        section.setCreatedAt(Instant.now());
        section.setUpdatedAt(Instant.now());
        section.setIsDeleted(false);

        sectionRepository.save(section);

        return section.getId();
    }

    @Transactional
    public void updateSection(Long sectionId, UpdateSectionRequest request) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow();

        section.setTitle(request.title());
        section.setUpdatedAt(Instant.now());
        sectionRepository.save(section);
    }

}
