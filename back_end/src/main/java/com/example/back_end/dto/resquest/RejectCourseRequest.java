package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotBlank;

public record RejectCourseRequest(
        @NotBlank(message = "Reason is required") String reason
) {}
