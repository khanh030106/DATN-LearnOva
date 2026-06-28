package com.example.back_end.dto.response.admin;

import java.math.BigDecimal;

public record AdminRevenueInstructorRankingResponse(
        Long instructorId,
        String instructor,
        Long totalCourses,
        Long totalStudents,
        BigDecimal revenue,
        BigDecimal avgPerCourse,
        BigDecimal share
) {}
