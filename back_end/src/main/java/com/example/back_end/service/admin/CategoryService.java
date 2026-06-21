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
                    String status = category.getStatus() != null
                            ? category.getStatus()
                            : (Boolean.TRUE.equals(category.getIsDeleted()) ? "Hidden" : "Active");

                    return new CategoryResponse(
                        category.getId(),
                        category.getName(),
                        category.getSlug(),
                        parentId,
                        parentName,
                        category.getDisplayOrder(),
                        status,
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
        String status = category.getStatus() != null
                ? category.getStatus()
                : (Boolean.TRUE.equals(category.getIsDeleted()) ? "Hidden" : "Active");

        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getSlug(),
            parentId,
            parentName,
            category.getDisplayOrder(),
            status,
            category.getIsDeleted(),
            category.getCreatedAt(),
            category.getUpdatedAt()
        );
    }

    public List<CategoryResponse> getCategoriesByParentId(Long parentId) {
        return categoryRepository.findChildrenByParentId(parentId).stream()
                .map(category -> {
                    Long categoryParentId = category.getParent() != null ? category.getParent().getId() : null;
                    String parentName = category.getParent() != null ? category.getParent().getName() : null;
                    String status = category.getStatus() != null
                            ? category.getStatus()
                            : (Boolean.TRUE.equals(category.getIsDeleted()) ? "Hidden" : "Active");

                    return new CategoryResponse(
                        category.getId(),
                        category.getName(),
                        category.getSlug(),
                        categoryParentId,
                        parentName,
                        category.getDisplayOrder(),
                        status,
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
        Integer displayOrder = request.displayOrder();
        category.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);

        String statusValue = request.status();
        if (statusValue == null || statusValue.isBlank()) {
            statusValue = "Active";
        } else if (statusValue.trim().equalsIgnoreCase("pending")) {
            statusValue = "Pending";
        } else if (statusValue.trim().equalsIgnoreCase("hidden")) {
            statusValue = "Hidden";
        } else {
            statusValue = "Active";
        }

        category.setStatus(statusValue);
        category.setIsDeleted("Hidden".equals(statusValue));
        category.setCreatedAt(Instant.now());
        category.setUpdatedAt(Instant.now());

        Category saved = categoryRepository.save(category);

        Long savedParentId = saved.getParent() != null ? saved.getParent().getId() : null;
        String savedParentName = saved.getParent() != null ? saved.getParent().getName() : null;

        return new CategoryResponse(
            saved.getId(),
            saved.getName(),
            saved.getSlug(),
            savedParentId,
            savedParentName,
            saved.getDisplayOrder(),
            saved.getStatus(),
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

        if (request.parentId() != null && !request.parentId().equals(id)) {
            Category parent = categoryRepository.findActiveById(request.parentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found with id: " + request.parentId()));
            category.setParent(parent);
        } else if (request.parentId() == null) {
            category.setParent(null);
        }

        category.setName(request.name());
        category.setSlug(request.slug());
        Integer displayOrder = request.displayOrder();
        category.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);

        String statusValue = request.status();
        if (statusValue == null || statusValue.isBlank()) {
            statusValue = "Active";
        } else if (statusValue.trim().equalsIgnoreCase("pending")) {
            statusValue = "Pending";
        } else if (statusValue.trim().equalsIgnoreCase("hidden")) {
            statusValue = "Hidden";
        } else {
            statusValue = "Active";
        }

        category.setStatus(statusValue);
        category.setIsDeleted("Hidden".equals(statusValue));
        category.setUpdatedAt(Instant.now());

        Category updated = categoryRepository.save(category);

        Long updatedParentId = updated.getParent() != null ? updated.getParent().getId() : null;
        String updatedParentName = updated.getParent() != null ? updated.getParent().getName() : null;

        return new CategoryResponse(
            updated.getId(),
            updated.getName(),
            updated.getSlug(),
            updatedParentId,
            updatedParentName,
            updated.getDisplayOrder(),
            updated.getStatus(),
            updated.getIsDeleted(),
            updated.getCreatedAt(),
            updated.getUpdatedAt()
        );
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findByIdForAdmin(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        category.setStatus("Hidden");
        category.setIsDeleted(true);
        category.setUpdatedAt(Instant.now());
        categoryRepository.save(category);
    }
}