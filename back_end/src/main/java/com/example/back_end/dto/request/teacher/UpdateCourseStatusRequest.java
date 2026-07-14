package com.example.back_end.dto.request.teacher;

import jakarta.validation.constraints.NotBlank;

public record UpdateCourseStatusRequest(
        @NotBlank(message = "Status is required") String status
) {}
