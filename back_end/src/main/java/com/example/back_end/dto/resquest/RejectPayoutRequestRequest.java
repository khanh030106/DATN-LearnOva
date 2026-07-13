package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotBlank;

public record RejectPayoutRequestRequest(
        @NotBlank String reason
) {
}
