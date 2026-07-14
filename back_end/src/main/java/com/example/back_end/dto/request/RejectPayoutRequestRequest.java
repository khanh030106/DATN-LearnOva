package com.example.back_end.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RejectPayoutRequestRequest(
        @NotBlank String reason
) {
}
