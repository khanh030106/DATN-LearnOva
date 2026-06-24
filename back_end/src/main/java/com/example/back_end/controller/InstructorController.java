package com.example.back_end.controller;

import com.example.back_end.dto.response.InstructorResponse;
import com.example.back_end.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class InstructorController {

    private final UserService userService;

    @GetMapping("/instructors")
    public ResponseEntity<List<InstructorResponse>> getAllInstructors() {
        return ResponseEntity.ok(userService.getInstructors());
    }
}
