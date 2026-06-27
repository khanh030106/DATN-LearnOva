package com.example.back_end.service.admin;

import java.text.Normalizer;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.response.admin.AdminCategoryResponse;
import com.example.back_end.dto.resquest.admin.AdminCategoryRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.admin.AdminCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminCategoryService {

    private static final int STEP = 10;

    private final AdminCategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<AdminCategoryResponse> getAllCategories() {
        return categoryRepository.findAllForAdmin().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AdminCategoryResponse getCategoryById(Long id) {
        return toResponse(categoryRepository.findByIdForAdmin(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id)));
    }

    @Transactional(readOnly = true)
    public List<AdminCategoryResponse> getCategoriesByParentId(Long parentId) {
        return categoryRepository.findChildrenByParentId(parentId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * INSERT logic:
     *   1. Use the admin-supplied displayOrder (never fall back to MAX+step).
     *      Default to STEP (10) only when the field is genuinely absent.
     *   2. Shift all existing rows whose displayOrder >= requested order up by STEP.
     *   3. Insert at the exact requested position.
     *
     * Why NOT MAX+step: the admin chose a position intentionally.
     * Using MAX+step ignores that intent and always appends to the end.
     */
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public AdminCategoryResponse createCategory(AdminCategoryRequest request) {
        Category parent = resolveParent(request.parentId(), null);

        int order = request.displayOrder() != null ? request.displayOrder() : STEP;

        categoryRepository.shiftUpFrom(order);   // rows with order >= X → order + 10

        Category category = new Category();
        category.setName(request.name());
        category.setSlug(generateUniqueSlug(request.name()));
        category.setParent(parent);
        category.setDisplayOrder(order);
        category.setIsDeleted(false);
        category.setCreatedAt(Instant.now());
        category.setUpdatedAt(Instant.now());

        return toResponse(categoryRepository.save(category));
    }

    /**
     * UPDATE display_order logic (step = 10):
     *
     *   Moving UP   (newOrder < oldOrder):
     *     Shift [newOrder, oldOrder - 10] by +10   → makes room at newOrder
     *
     *   Moving DOWN (newOrder > oldOrder):
     *     Shift [oldOrder + 10, newOrder] by -10   → fills the gap left at oldOrder
     *
     *   No change   (newOrder == oldOrder): skip all shifts.
     *
     * Self is always excluded from the bulk UPDATE via AND c.id != :excludeId.
     */
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public AdminCategoryResponse updateCategory(Long id, AdminCategoryRequest request) {
        Category category = categoryRepository.findByIdForAdmin(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));

        if (request.parentId() != null && request.parentId().equals(id)) {
            throw new BusinessException("Category cannot be its own parent");
        }
        category.setParent(resolveParent(request.parentId(), id));

        int oldOrder = category.getDisplayOrder();
        int newOrder = request.displayOrder() != null ? request.displayOrder() : oldOrder;

        if (newOrder < oldOrder) {
            int lower = newOrder;
            int upper = oldOrder - STEP;
            if (lower <= upper) {
                categoryRepository.shiftUpRange(lower, upper, id);
            }
            category.setDisplayOrder(newOrder);
        } else if (newOrder > oldOrder) {
            int lower = oldOrder + STEP;
            int upper = newOrder;
            if (lower <= upper) {
                categoryRepository.shiftDownRange(lower, upper, id);
            }
            category.setDisplayOrder(newOrder);
        }

        String oldName = category.getName();
        category.setName(request.name());
        if (!oldName.equals(request.name())) {
            category.setSlug(generateUniqueSlugExcluding(request.name(), id));
        }

        if (request.isDeleted() != null) {
            category.setIsDeleted(request.isDeleted());
        }

        category.setUpdatedAt(Instant.now());
        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findByIdForAdmin(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
        category.setIsDeleted(true);
        category.setUpdatedAt(Instant.now());
        categoryRepository.save(category);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private Category resolveParent(Long parentId, Long selfId) {
        if (parentId == null) return null;
        if (parentId.equals(selfId)) throw new BusinessException("Category cannot be its own parent");
        return categoryRepository.findActiveById(parentId)
                .orElseThrow(() -> new ResourceNotFoundException("Parent category not found: " + parentId));
    }

    private AdminCategoryResponse toResponse(Category c) {
        Long parentId = c.getParent() != null ? c.getParent().getId() : null;
        String parentName = c.getParent() != null ? c.getParent().getName() : null;
        return new AdminCategoryResponse(
                c.getId(), c.getName(), c.getSlug(),
                parentId, parentName, c.getDisplayOrder(),
                c.getIsDeleted(), c.getCreatedAt(), c.getUpdatedAt());
    }

    private String generateSlug(String name) {
        String pre = name.replace("đ", "d").replace("Đ", "D");
        return Normalizer.normalize(pre, Normalizer.Form.NFD)
                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "")
                .toLowerCase().trim()
                .replaceAll("\\s+", "-")
                .replaceAll("[^a-z0-9-]", "");
    }

    private String generateUniqueSlug(String name) {
        String base = generateSlug(name);
        String candidate = base;
        for (int i = 2; categoryRepository.countBySlug(candidate) > 0; i++) {
            candidate = base + "-" + i;
        }
        return candidate;
    }

    private String generateUniqueSlugExcluding(String name, Long excludeId) {
        String base = generateSlug(name);
        String candidate = base;
        for (int i = 2; categoryRepository.countBySlugAndNotId(candidate, excludeId) > 0; i++) {
            candidate = base + "-" + i;
        }
        return candidate;
    }
}
