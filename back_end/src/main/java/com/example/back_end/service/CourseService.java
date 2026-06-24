package com.example.back_end.service;

import com.example.back_end.dto.response.CourseResponse;
import com.example.back_end.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseResponse> getPublishedCourses() {
        return courseRepository.findAllPublishedWithInstructor();
    }
}
