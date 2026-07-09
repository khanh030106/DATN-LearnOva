package com.example.back_end.dto.response;

public record TopCategoryResponse(
        Long id,
        String name,
        String slug,
        long soldCount
) {}
