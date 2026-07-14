package com.example.back_end.controller;

import com.example.back_end.dto.response.CourseSearchResponse;
import com.example.back_end.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public List<CourseSearchResponse> searchCourses(@RequestParam(name = "q", required = false) String query) {
        return searchService.searchCourses(query);
    }
}
