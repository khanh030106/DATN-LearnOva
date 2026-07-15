package com.example.back_end.dto.request.teacher;

public record CreateSectionRequest(
        String title,
        Integer sectionOrder
) {
}