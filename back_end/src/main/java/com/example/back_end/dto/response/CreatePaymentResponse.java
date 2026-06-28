package com.example.back_end.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record CreatePaymentResponse(
        Long orderId,
        Long paymentId,
        Long courseId,
        String courseTitle,
        BigDecimal subtotal,
        BigDecimal discountAmount,
        BigDecimal totalAmount,
        String paymentMethod,
        String paymentStatus,
        String orderStatus,
        String checkoutUrl,
        String qrCode,
        String paymentLinkId,
        OffsetDateTime expiresAt
) {}
