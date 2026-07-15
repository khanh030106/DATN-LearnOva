package com.example.back_end.dto.response;

import java.time.Instant;

public record CertificateVerifyResponse(
        boolean valid,
        String certificateCode,
        String studentName,
        String courseTitle,
        String instructorName,
        Instant issuedAt
) {
}
