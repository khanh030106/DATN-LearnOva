package com.example.back_end.dto.response;

public record PublicInstructorSummaryResponse(
        Long instructorId,
        String fullName,
        String avatar,
        String avatarKey,
        String headline,
        String expertise,
        long courseCount,
        long studentCount,
        double avgRating,
        long ratingCount
) {}
