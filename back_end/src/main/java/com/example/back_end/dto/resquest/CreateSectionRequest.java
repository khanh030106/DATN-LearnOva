package com.example.back_end.dto.resquest;

public record CreateSectionRequest(
        String title,
        Integer sectionOrder
) {
}