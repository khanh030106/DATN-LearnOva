package com.example.back_end.dto.response.admin;

public record AdminVoucherUsageFrequencyResponse(
        String month,
        Long activations
) {}
