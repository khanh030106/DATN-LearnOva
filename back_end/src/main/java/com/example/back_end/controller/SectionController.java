package com.example.back_end.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dto.response.CreateSectionResponse;
import com.example.back_end.dto.request.CreateSectionRequest;
import com.example.back_end.dto.request.UpdateSectionRequest;
import com.example.back_end.service.SectionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/courses")
@PreAuthorize("hasRole('TEACHER')")
public class SectionController {

    private final SectionService sectionService;

    @PostMapping("/{courseId}/sections")
    public CreateSectionResponse createSection(
            @PathVariable Long courseId,
            @RequestBody @Valid CreateSectionRequest request
    ) {
        Long sectionId = sectionService.createSection(
                courseId,
                request
        );

        return new CreateSectionResponse(sectionId);
    }

    @PutMapping("/sections/{sectionId}")
    public void updateSection(
            @PathVariable Long sectionId,
            @RequestBody @Valid UpdateSectionRequest request
    ) {
        sectionService.updateSection(sectionId, request);
    }

}
