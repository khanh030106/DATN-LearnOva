package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequest(
    @NotBlank(message = "Category name is required")
    @Size(min = 1, max = 255, message = "Category name must be between 1 and 255 characters")
    String name,

    @NotBlank(message = "Slug is required")
    @Size(min = 1, max = 255, message = "Slug must be between 1 and 255 characters")
    String slug,

    Long parentId,

    Integer displayOrder
) {}