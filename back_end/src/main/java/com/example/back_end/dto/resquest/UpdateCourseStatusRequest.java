package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotBlank;

public record UpdateCourseStatusRequest(
        @NotBlank(message = "Status is required") String status
) {}
