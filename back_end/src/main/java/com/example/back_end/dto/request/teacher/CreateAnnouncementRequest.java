package com.example.back_end.dto.request.teacher;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateAnnouncementRequest(
        @NotNull Long courseId,
        @NotBlank @Size(max = 255) String title,
        @NotBlank @Size(max = 2000) String content
) {
}
