package com.example.back_end.dto.resquest;

import com.example.back_end.entity.enums.UploadType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GenerateUploadUrlRequest(
        @NotNull
        UploadType type,
        @NotBlank
        String fileName,
        @NotBlank
        String contentType
) {
}
