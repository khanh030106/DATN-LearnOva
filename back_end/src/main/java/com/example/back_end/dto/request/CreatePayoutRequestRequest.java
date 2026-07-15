package com.example.back_end.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreatePayoutRequestRequest(
        @NotNull @DecimalMin("0.01") BigDecimal amount,
        String notes
) {
}
