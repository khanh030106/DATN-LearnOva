package com.example.back_end.repository.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.back_end.entity.Category;

public interface AdminCategoryRepository extends JpaRepository<Category, Long> {
    
    @Query("SELECT category FROM Category category WHERE category.isDeleted = false ORDER BY category.displayOrder, category.name")
    List<Category> findAllActive();

    @Query("SELECT category FROM Category category ORDER BY category.displayOrder, category.name")
    List<Category> findAllForAdmin();
    
    @Query("SELECT category FROM Category category WHERE category.id = :id AND category.isDeleted = false")
    Optional<Category> findActiveById(@Param("id") Long id);

    @Query("SELECT category FROM Category category WHERE category.id = :id")
    Optional<Category> findByIdForAdmin(@Param("id") Long id);
    
    @Query("SELECT category FROM Category category WHERE category.parent.id = :parentId AND category.isDeleted = false")
    List<Category> findChildrenByParentId(@Param("parentId") Long parentId);
    
    @Query("SELECT COUNT(category) FROM Category category WHERE category.slug = :slug AND category.isDeleted = false AND category.id != :id")
    long countBySlugAndNotId(@Param("slug") String slug, @Param("id") Long id);
    
    @Query("SELECT COUNT(category) FROM Category category WHERE category.slug = :slug AND category.isDeleted = false")
    long countBySlug(@Param("slug") String slug);
}
