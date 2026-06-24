package com.example.back_end.dto.resquest.admin;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminCourseRequest(
    @NotBlank String thumbnailKey,
    @NotBlank String title,
    @NotBlank String slug,
    @NotBlank String description,
    @Size(max = 10) String language,
    List<String> requirements,
    List<String> whatYouLearn,
    @NotNull BigDecimal basePrice,
    @NotBlank String level,
    @NotBlank String status,
    @NotNull Long instructorId,
    Boolean isDeleted
) {}
