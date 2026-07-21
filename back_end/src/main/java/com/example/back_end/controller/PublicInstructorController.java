package com.example.back_end.controller;

import com.example.back_end.dto.response.PublicInstructorDetailResponse;
import com.example.back_end.dto.response.PublicInstructorResponse;
import com.example.back_end.service.PublicInstructorService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/instructors/public")
public class PublicInstructorController {

    private final PublicInstructorService publicInstructorService;

    @GetMapping
    public List<PublicInstructorResponse> getPublicInstructors() {
        return publicInstructorService.getPublicInstructors();
    }

    @GetMapping("/{instructorId}")
    public PublicInstructorDetailResponse getPublicInstructorDetail(@PathVariable Long instructorId) {
        return publicInstructorService.getPublicInstructorDetail(instructorId);
    }
}
