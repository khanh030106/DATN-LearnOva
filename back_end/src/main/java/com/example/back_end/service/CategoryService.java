package com.example.back_end.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.response.CategoryResponse;
import com.example.back_end.dto.resquest.CategoryRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAllActive()
            .stream()
            .map(this::toCategoryResponse)
            .collect(Collectors.toList());
    }
    
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findActiveById(id).orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return toCategoryResponse(category);
    }
    
    public List<CategoryResponse> getCategoriesByParentId(Long parentId) {
        return categoryRepository.findChildrenByParentId(parentId).stream().map(this::toCategoryResponse).collect(Collectors.toList());
    }
    
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.countBySlug(request.slug()) > 0) {
            throw new RuntimeException("Category with slug '" + request.slug() + "' already exists");
        }
        
        Category parent = null;
        if (request.parentId() != null) {
            parent = categoryRepository.findActiveById(request.parentId()).orElseThrow(() -> new RuntimeException("Parent category not found with id: " + request.parentId()));
        }
        
        Category category = new Category();
        category.setName(request.name());
        category.setSlug(request.slug());
        category.setParent(parent);
        category.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);
        category.setIsDeleted(false);
        category.setCreatedAt(Instant.now());
        category.setUpdatedAt(Instant.now());
        
        Category saved = categoryRepository.save(category);
        return toCategoryResponse(saved);
    }
    
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findActiveById(id).orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        
        if (!category.getSlug().equals(request.slug()) && 
            categoryRepository.countBySlugAndNotId(request.slug(), id) > 0) {
            throw new RuntimeException("Category with slug '" + request.slug() + "' already exists");
        }
        
        if (request.parentId() != null && !request.parentId().equals(id)) {
            Category parent = categoryRepository.findActiveById(request.parentId()).orElseThrow(() -> new RuntimeException("Parent category not found with id: " + request.parentId()));
            category.setParent(parent);
        } else if (request.parentId() == null) {
            category.setParent(null);  
        }
        
        category.setName(request.name());
        category.setSlug(request.slug());
        category.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);
        category.setUpdatedAt(Instant.now());
        
        Category updated = categoryRepository.save(category);
        return toCategoryResponse(updated);
    }
    
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findActiveById(id).orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        
        category.setIsDeleted(true);           
        category.setUpdatedAt(Instant.now()); 
        categoryRepository.save(category);     
    }
    
    private CategoryResponse toCategoryResponse(Category category) {
        String parentName = category.getParent() != null ? category.getParent().getName() : null;
        Long parentId = category.getParent() != null ? category.getParent().getId() : null;
        
        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getSlug(),
            parentId,
            parentName,
            category.getDisplayOrder(),
            category.getIsDeleted(),
            category.getCreatedAt(),
            category.getUpdatedAt()
        );
    }
}