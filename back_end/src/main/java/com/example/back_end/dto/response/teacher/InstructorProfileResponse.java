package com.example.back_end.dto.response.teacher;

import java.util.Map;

public record InstructorProfileResponse(
        String headline,
        String description,
        String expertise,
        String avatarKey,
        Map<String, String> socialLinks
) {}
