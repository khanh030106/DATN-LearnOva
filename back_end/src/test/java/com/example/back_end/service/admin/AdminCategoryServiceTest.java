package com.example.back_end.service.admin;

import com.example.back_end.dto.response.admin.AdminCategoryResponse;
import com.example.back_end.dto.resquest.admin.AdminCategoryRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.admin.AdminCategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminCategoryServiceTest {

    @Mock
    AdminCategoryRepository categoryRepository;

    @InjectMocks
    AdminCategoryService service;

    // ── Helpers ──────────────────────────────────────────────────────────────

    private Category makeCategory(Long id, String name, String slug, int displayOrder) {
        Category c = new Category();
        c.setId(id);
        c.setName(name);
        c.setSlug(slug);
        c.setDisplayOrder(displayOrder);
        c.setIsDeleted(false);
        c.setCreatedAt(Instant.now());
        c.setUpdatedAt(Instant.now());
        return c;
    }

    private AdminCategoryRequest req(String name, Long parentId, Integer displayOrder) {
        return new AdminCategoryRequest(name, parentId, displayOrder, null);
    }

    @BeforeEach
    void stubSave() {
        // lenient: some tests throw before reaching save(); strict mode would flag it
        lenient().when(categoryRepository.save(any(Category.class))).thenAnswer(inv -> inv.getArgument(0));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CREATE
    // ─────────────────────────────────────────────────────────────────────────

    @Nested
    @DisplayName("createCategory")
    class Create {

        @Test
        @DisplayName("inserts at requested displayOrder and shifts rows >= that order by +10")
        void insertsAtRequestedOrderAndShifts() {
            when(categoryRepository.countBySlug(anyString())).thenReturn(0L);

            service.createCategory(req("Frontend", null, 20));

            verify(categoryRepository).shiftUpFrom(20);

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getDisplayOrder()).isEqualTo(20);
        }

        @Test
        @DisplayName("defaults displayOrder to STEP (10) — never MAX+step — when null")
        void defaultsToStepWhenDisplayOrderNull() {
            when(categoryRepository.countBySlug(anyString())).thenReturn(0L);

            service.createCategory(req("Backend", null, null));

            verify(categoryRepository).shiftUpFrom(10);

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getDisplayOrder()).isEqualTo(10);
        }

        @Test
        @DisplayName("generates slug from name — lowercase, spaces → hyphens")
        void generatesSlugFromName() {
            when(categoryRepository.countBySlug(anyString())).thenReturn(0L);

            service.createCategory(req("Machine Learning", null, 10));

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getSlug()).isEqualTo("machine-learning");
        }

        @Test
        @DisplayName("strips Vietnamese diacritics when generating slug")
        void stripsVietnameseDiacritics() {
            when(categoryRepository.countBySlug(anyString())).thenReturn(0L);

            service.createCategory(req("Lập Trình Web", null, 10));

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getSlug()).isEqualTo("lap-trinh-web");
        }

        @Test
        @DisplayName("appends -2, -3 suffix when slug already exists")
        void appendsSuffixOnSlugConflict() {
            when(categoryRepository.countBySlug("frontend")).thenReturn(1L);
            when(categoryRepository.countBySlug("frontend-2")).thenReturn(1L);
            when(categoryRepository.countBySlug("frontend-3")).thenReturn(0L);

            service.createCategory(req("Frontend", null, 10));

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getSlug()).isEqualTo("frontend-3");
        }

        @Test
        @DisplayName("resolves parent and links it to the new category")
        void resolvesParent() {
            Category parent = makeCategory(1L, "Technology", "technology", 10);
            when(categoryRepository.findActiveById(1L)).thenReturn(Optional.of(parent));
            when(categoryRepository.countBySlug(anyString())).thenReturn(0L);

            service.createCategory(req("Frontend", 1L, 20));

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getParent()).isSameAs(parent);
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when parent does not exist")
        void throwsWhenParentNotFound() {
            when(categoryRepository.findActiveById(99L)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> service.createCategory(req("Frontend", 99L, 10)))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("99");
        }

        @Test
        @DisplayName("sets isDeleted = false on new category")
        void setsIsDeletedFalse() {
            when(categoryRepository.countBySlug(anyString())).thenReturn(0L);

            service.createCategory(req("Art", null, 10));

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getIsDeleted()).isFalse();
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UPDATE — display order shifts
    // ─────────────────────────────────────────────────────────────────────────

    @Nested
    @DisplayName("updateCategory — displayOrder shifts")
    class UpdateDisplayOrder {

        @Test
        @DisplayName("moving UP: shifts [newOrder, oldOrder-10] by +10 and sets newOrder")
        void movingUpShiftsCorrectRange() {
            Category existing = makeCategory(2L, "B", "b", 30);
            when(categoryRepository.findByIdForAdmin(2L)).thenReturn(Optional.of(existing));

            // Move from 30 → 10 (UP)
            service.updateCategory(2L, req("B", null, 10));

            // Range: [10, 30-10] = [10, 20]
            verify(categoryRepository).shiftUpRange(10, 20, 2L);
            verify(categoryRepository, never()).shiftDownRange(anyInt(), anyInt(), anyLong());

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getDisplayOrder()).isEqualTo(10);
        }

        @Test
        @DisplayName("moving DOWN: shifts [oldOrder+10, newOrder] by -10 and sets newOrder")
        void movingDownShiftsCorrectRange() {
            Category existing = makeCategory(3L, "C", "c", 10);
            when(categoryRepository.findByIdForAdmin(3L)).thenReturn(Optional.of(existing));

            // Move from 10 → 40 (DOWN)
            service.updateCategory(3L, req("C", null, 40));

            // Range: [10+10, 40] = [20, 40]
            verify(categoryRepository).shiftDownRange(20, 40, 3L);
            verify(categoryRepository, never()).shiftUpRange(anyInt(), anyInt(), anyLong());

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getDisplayOrder()).isEqualTo(40);
        }

        @Test
        @DisplayName("no shift when displayOrder unchanged")
        void noShiftWhenOrderUnchanged() {
            Category existing = makeCategory(4L, "D", "d", 20);
            when(categoryRepository.findByIdForAdmin(4L)).thenReturn(Optional.of(existing));

            service.updateCategory(4L, req("D", null, 20));

            verify(categoryRepository, never()).shiftUpRange(anyInt(), anyInt(), anyLong());
            verify(categoryRepository, never()).shiftDownRange(anyInt(), anyInt(), anyLong());
            verify(categoryRepository, never()).shiftUpFrom(anyInt());
        }

        @Test
        @DisplayName("no shift when adjacent step up (newOrder = oldOrder - 10): range [x, x-10] is invalid")
        void noShiftWhenRangeInvalidOnMoveUp() {
            // adjacent step: 20 → 10, range = [10, 20-10] = [10, 10] → still valid, 1 row shifts
            Category existing = makeCategory(5L, "E", "e", 20);
            when(categoryRepository.findByIdForAdmin(5L)).thenReturn(Optional.of(existing));

            service.updateCategory(5L, req("E", null, 10));

            verify(categoryRepository).shiftUpRange(10, 10, 5L);
        }

        @Test
        @DisplayName("no shift when adjacent step down (newOrder = oldOrder + 10): range [x, x] is valid")
        void shiftWhenAdjacentStepDown() {
            Category existing = makeCategory(6L, "F", "f", 10);
            when(categoryRepository.findByIdForAdmin(6L)).thenReturn(Optional.of(existing));

            service.updateCategory(6L, req("F", null, 20));

            verify(categoryRepository).shiftDownRange(20, 20, 6L);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UPDATE — slug & name
    // ─────────────────────────────────────────────────────────────────────────

    @Nested
    @DisplayName("updateCategory — slug regeneration")
    class UpdateSlug {

        @Test
        @DisplayName("regenerates slug when name changes")
        void regeneratesSlugOnNameChange() {
            Category existing = makeCategory(7L, "Old Name", "old-name", 10);
            when(categoryRepository.findByIdForAdmin(7L)).thenReturn(Optional.of(existing));
            when(categoryRepository.countBySlugAndNotId("new-name", 7L)).thenReturn(0L);

            service.updateCategory(7L, req("New Name", null, 10));

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getSlug()).isEqualTo("new-name");
        }

        @Test
        @DisplayName("keeps existing slug when name is unchanged")
        void keepsSlugWhenNameUnchanged() {
            Category existing = makeCategory(8L, "Same Name", "same-name", 10);
            when(categoryRepository.findByIdForAdmin(8L)).thenReturn(Optional.of(existing));

            service.updateCategory(8L, req("Same Name", null, 10));

            verify(categoryRepository, never()).countBySlugAndNotId(anyString(), anyLong());
            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getSlug()).isEqualTo("same-name");
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UPDATE — parent & validation
    // ─────────────────────────────────────────────────────────────────────────

    @Nested
    @DisplayName("updateCategory — validation")
    class UpdateValidation {

        @Test
        @DisplayName("throws BusinessException when category set as its own parent")
        void throwsOnSelfParent() {
            Category existing = makeCategory(10L, "Self", "self", 10);
            when(categoryRepository.findByIdForAdmin(10L)).thenReturn(Optional.of(existing));

            assertThatThrownBy(() -> service.updateCategory(10L, req("Self", 10L, 10)))
                    .isInstanceOf(BusinessException.class)
                    .hasMessageContaining("own parent");
        }

        @Test
        @DisplayName("throws ResourceNotFoundException for unknown id")
        void throwsWhenCategoryNotFound() {
            when(categoryRepository.findByIdForAdmin(999L)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> service.updateCategory(999L, req("X", null, 10)))
                    .isInstanceOf(ResourceNotFoundException.class);
        }

        @Test
        @DisplayName("clears parent when parentId is null")
        void clearsParentWhenNull() {
            Category parent = makeCategory(1L, "Parent", "parent", 10);
            Category existing = makeCategory(11L, "Child", "child", 20);
            existing.setParent(parent);
            when(categoryRepository.findByIdForAdmin(11L)).thenReturn(Optional.of(existing));

            service.updateCategory(11L, req("Child", null, 20));

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getParent()).isNull();
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE
    // ─────────────────────────────────────────────────────────────────────────

    @Nested
    @DisplayName("deleteCategory")
    class Delete {

        @Test
        @DisplayName("soft-deletes by setting isDeleted = true")
        void softDeletes() {
            Category existing = makeCategory(12L, "ToDelete", "to-delete", 10);
            when(categoryRepository.findByIdForAdmin(12L)).thenReturn(Optional.of(existing));

            service.deleteCategory(12L);

            ArgumentCaptor<Category> saved = ArgumentCaptor.forClass(Category.class);
            verify(categoryRepository).save(saved.capture());
            assertThat(saved.getValue().getIsDeleted()).isTrue();
        }

        @Test
        @DisplayName("throws ResourceNotFoundException for unknown id")
        void throwsWhenNotFound() {
            when(categoryRepository.findByIdForAdmin(404L)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> service.deleteCategory(404L))
                    .isInstanceOf(ResourceNotFoundException.class);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET ALL
    // ─────────────────────────────────────────────────────────────────────────

    @Nested
    @DisplayName("getAllCategories")
    class GetAll {

        @Test
        @DisplayName("returns mapped response list ordered by displayOrder")
        void returnsMappedList() {
            Category a = makeCategory(1L, "A", "a", 10);
            Category b = makeCategory(2L, "B", "b", 20);
            when(categoryRepository.findAllForAdmin()).thenReturn(List.of(a, b));

            List<AdminCategoryResponse> result = service.getAllCategories();

            assertThat(result).hasSize(2);
            assertThat(result.get(0).id()).isEqualTo(1L);
            assertThat(result.get(1).id()).isEqualTo(2L);
        }
    }
}
