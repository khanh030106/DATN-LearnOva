package com.example.back_end.dto.response.admin;

import java.math.BigDecimal;
import java.time.Instant;

public record AdminVoucherUsageHistoryResponse(
        String studentName,
        String registeredCourse,
        String appliedCode,
        BigDecimal originalPrice,
        BigDecimal discount,
        BigDecimal paid,
        Instant usedAt
) {}
