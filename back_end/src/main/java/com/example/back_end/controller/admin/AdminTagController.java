package com.example.back_end.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dto.response.admin.AdminTagResponse;
import com.example.back_end.dto.resquest.admin.AdminTagRequest;
import com.example.back_end.service.admin.AdminTagService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/admin/tags-management")
public class AdminTagController {
    
    private final AdminTagService tagService;
    
    @GetMapping
    public ResponseEntity<List<AdminTagResponse>> getAllTags() {
        List<AdminTagResponse> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AdminTagResponse> getTagById(@PathVariable Long id) {
        try {
            AdminTagResponse tag = tagService.getTagById(id);
            return ResponseEntity.ok(tag);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<AdminTagResponse> createTag(
        @Valid @RequestBody AdminTagRequest request
    ) {
        try {
            AdminTagResponse tag = tagService.createTag(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(tag);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<AdminTagResponse> updateTag(
        @PathVariable Long id,
        @Valid @RequestBody AdminTagRequest request
    ) {
        try {
            AdminTagResponse tag = tagService.updateTag(id, request);
            return ResponseEntity.ok(tag);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        try {
            tagService.deleteTag(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
