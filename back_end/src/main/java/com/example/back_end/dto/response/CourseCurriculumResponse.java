package com.example.back_end.dto.response;

import java.util.List;

public record CourseCurriculumResponse(
        Long courseId,
        String title,
        Integer chaptersTotal,
        Integer lessonsTotal,
        List<SectionResponse> curriculum,
        List<String> categories,
        List<String> whatYouLearn,
        String description,
        String duration,
        String updatedAt
) {
}