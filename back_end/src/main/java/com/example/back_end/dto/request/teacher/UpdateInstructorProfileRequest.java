package com.example.back_end.dto.request.teacher;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Map;

@Data
public class UpdateInstructorProfileRequest {

    @Size(max = 150, message = "Headline must be at most 150 characters")
    private String headline;

    @Size(max = 5000, message = "Description must be at most 5000 characters")
    private String description;

    @Size(max = 255, message = "Expertise must be at most 255 characters")
    private String expertise;

    private String avatarKey;

    private Map<String, String> socialLinks;
}
