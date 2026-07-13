package com.example.back_end.dto.response;

import java.time.Instant;

public record TeacherStudentCourseResponse(
        Long courseId,
        String courseTitle,
        int progressPercent,
        Instant enrolledAt
) {}
