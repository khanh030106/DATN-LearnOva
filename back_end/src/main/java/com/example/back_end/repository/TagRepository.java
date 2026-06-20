package com.example.back_end.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.back_end.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    
    @Query("SELECT t FROM Tag t WHERE t.isDeleted = false ORDER BY t.name")
    List<Tag> findAllActive();
    
    @Query("SELECT t FROM Tag t WHERE t.id = :id AND t.isDeleted = false")
    Optional<Tag> findActiveById(@Param("id") Long id);
    
    @Query("SELECT COUNT(t) FROM Tag t WHERE t.slug = :slug AND t.isDeleted = false AND t.id != :id")
    long countBySlugAndNotId(@Param("slug") String slug, @Param("id") Long id);
    
    @Query("SELECT COUNT(t) FROM Tag t WHERE t.slug = :slug AND t.isDeleted = false")
    long countBySlug(@Param("slug") String slug);
}