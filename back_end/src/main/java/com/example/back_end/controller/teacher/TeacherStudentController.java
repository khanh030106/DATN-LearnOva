package com.example.back_end.controller.teacher;

import com.example.back_end.dto.response.teacher.TeacherStudentResponse;
import com.example.back_end.service.teacher.TeacherStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/teacher/students")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherStudentController {

    private final TeacherStudentService teacherStudentService;

    @GetMapping
    public ResponseEntity<List<TeacherStudentResponse>> getMyStudents(Authentication authentication) {
        return ResponseEntity.ok(teacherStudentService.getMyStudents(authentication.getName()));
    }
}
