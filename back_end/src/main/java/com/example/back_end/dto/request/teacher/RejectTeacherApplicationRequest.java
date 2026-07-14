package com.example.back_end.dto.request.teacher;

import jakarta.validation.constraints.NotBlank;

public record RejectTeacherApplicationRequest(
        @NotBlank(message = "Reason is required") String reason
) {}
