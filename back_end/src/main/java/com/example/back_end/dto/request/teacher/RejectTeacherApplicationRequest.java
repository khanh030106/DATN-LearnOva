package com.example.back_end.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RejectTeacherApplicationRequest(
        @NotBlank(message = "Reason is required") String reason
) {}
