package com.example.back_end.service.admin;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.response.admin.CategoryResponse;
import com.example.back_end.dto.resquest.admin.CategoryRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.repository.admin.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAllForAdmin().stream()
                .map(category -> {
                    Long parentId = category.getParent() != null ? category.getParent().getId() : null;
                    String parentName = category.getParent() != null ? category.getParent().getName() : null;
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
                })
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findByIdForAdmin(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        Long parentId = category.getParent() != null ? category.getParent().getId() : null;
        String parentName = category.getParent() != null ? category.getParent().getName() : null;

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

    public List<CategoryResponse> getCategoriesByParentId(Long parentIdQuery) {
        return categoryRepository.findChildrenByParentId(parentIdQuery).stream()
                .map(category -> {
                    Long parentId = category.getParent() != null ? category.getParent().getId() : null;
                    String parentName = category.getParent() != null ? category.getParent().getName() : null;
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
                })
                .collect(Collectors.toList());
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.countBySlug(request.slug()) > 0) {
            throw new RuntimeException("Category with slug '" + request.slug() + "' already exists");
        }

        Category parent = null;
        if (request.parentId() != null) {
            parent = categoryRepository.findActiveById(request.parentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found with id: " + request.parentId()));
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

        Long parentId = saved.getParent() != null ? saved.getParent().getId() : null;
        String parentName = saved.getParent() != null ? saved.getParent().getName() : null;

        return new CategoryResponse(
            saved.getId(),
            saved.getName(),
            saved.getSlug(),
            parentId,
            parentName,
            saved.getDisplayOrder(),
            saved.getIsDeleted(),
            saved.getCreatedAt(),
            saved.getUpdatedAt()
        );
    }

    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findByIdForAdmin(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        if (!category.getSlug().equals(request.slug()) &&
            categoryRepository.countBySlugAndNotId(request.slug(), id) > 0) {
            throw new RuntimeException("Category with slug '" + request.slug() + "' already exists");
        }

        if (request.parentId() != null && request.parentId().equals(id)) {
            throw new RuntimeException("Category cannot be its own parent");
        }

        if (request.parentId() != null) {
            Category parent = categoryRepository.findActiveById(request.parentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found with id: " + request.parentId()));
            category.setParent(parent);
        } else if (request.parentId() == null) {
            category.setParent(null);
        }

        category.setName(request.name());
        category.setSlug(request.slug());
        category.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);

        if (request.isDeleted() != null) {
            category.setIsDeleted(request.isDeleted());
        }

        category.setUpdatedAt(Instant.now());

        Category updated = categoryRepository.save(category);

        Long parentId = updated.getParent() != null ? updated.getParent().getId() : null;
        String parentName = updated.getParent() != null ? updated.getParent().getName() : null;

        return new CategoryResponse(
            updated.getId(),
            updated.getName(),
            updated.getSlug(),
            parentId,
            parentName,
            updated.getDisplayOrder(),
            updated.getIsDeleted(),
            updated.getCreatedAt(),
            updated.getUpdatedAt()
        );
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findByIdForAdmin(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        category.setIsDeleted(true);
        category.setUpdatedAt(Instant.now());
        categoryRepository.save(category);
    }
}