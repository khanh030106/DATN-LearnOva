package com.example.back_end.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CourseReviewResponse {

    private Double averageRating;

    private long reviewCount;

    private List<ReviewResponse> reviews;
}