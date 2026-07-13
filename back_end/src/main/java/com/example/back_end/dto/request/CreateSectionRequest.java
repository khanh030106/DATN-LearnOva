package com.example.back_end.dto.request;

public record CreateSectionRequest(
        String title,
        Integer sectionOrder
) {
}