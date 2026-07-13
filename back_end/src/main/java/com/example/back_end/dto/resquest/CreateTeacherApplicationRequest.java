package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotBlank;

public record CreateTeacherApplicationRequest(
        @NotBlank(message = "Specialization is required") String specialization,
        @NotBlank(message = "Experience is required") String experience,
        @NotBlank(message = "CV is required") String cvKey
) {}
