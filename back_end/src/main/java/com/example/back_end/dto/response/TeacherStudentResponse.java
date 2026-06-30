package com.example.back_end.dto.response;

import java.time.Instant;
import java.util.List;

public record TeacherStudentResponse(
        Long studentId,
        String fullName,
        String email,
        String avatar,
        List<String> courseNames,
        Instant enrolledAt,
        int progressPercent
) {}
