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

import com.example.back_end.dto.response.admin.AdminCategoryResponse;
import com.example.back_end.dto.resquest.admin.AdminCategoryRequest;
import com.example.back_end.service.admin.AdminCategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova/admin/categories-management")
public class AdminCategoryController {
    
    private final AdminCategoryService categoryService;
    
    @GetMapping
    public ResponseEntity<List<AdminCategoryResponse>> getAllCategories() {
        List<AdminCategoryResponse> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AdminCategoryResponse> getCategoryById(@PathVariable Long id) {
        try {
            AdminCategoryResponse category = categoryService.getCategoryById(id);
            return ResponseEntity.ok(category);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}/children")
    public ResponseEntity<List<AdminCategoryResponse>> getChildCategories(@PathVariable Long id) {
        try {
            categoryService.getCategoryById(id);
            List<AdminCategoryResponse> children = categoryService.getCategoriesByParentId(id);
            return ResponseEntity.ok(children);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<AdminCategoryResponse> createCategory(
        @Valid @RequestBody AdminCategoryRequest request
    ) {
        try {
            AdminCategoryResponse category = categoryService.createCategory(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(category);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<AdminCategoryResponse> updateCategory(
        @PathVariable Long id,
        @Valid 
        @RequestBody AdminCategoryRequest request
    ) {
        try {
            AdminCategoryResponse category = categoryService.updateCategory(id, request);
            return ResponseEntity.ok(category);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}