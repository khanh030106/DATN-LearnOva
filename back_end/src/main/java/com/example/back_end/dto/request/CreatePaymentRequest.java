package com.example.back_end.dto.request;

import java.util.List;

public record CreatePaymentRequest(
        Long courseId,
        List<Long> courseIds,
        String voucherCode
) {}
