package com.example.back_end.dto.response;

import java.time.Instant;

public record CertificateResponse(
        Long id,
        Long courseId,
        String courseTitle,
        String certificateCode,
        Instant issuedAt
) {
}
