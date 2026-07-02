package com.example.back_end.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record PaymentStatusResponse(
        Long orderId,
        Long paymentId,
        String orderStatus,
        String paymentStatus,
        OffsetDateTime paidAt,
        Long courseId,
        String courseTitle,
        BigDecimal totalAmount
) {}
