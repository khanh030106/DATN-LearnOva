package com.example.back_end.dto.response;

public record InstructorResponse(
        Long id,
        String fullName,
        String email,
        String avatar,
        String coverImage,
        String roleName,
        String title,
        String skills,
        String bio
)
{}
