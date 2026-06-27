package com.example.back_end.repository;

import com.example.back_end.entity.Coursecategory;
import com.example.back_end.entity.CoursecategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CoursecategoryRepository extends JpaRepository<Coursecategory, CoursecategoryId> {

    @Query("SELECT cc FROM Coursecategory cc JOIN FETCH cc.category WHERE cc.course.id IN :courseIds")
    List<Coursecategory> findByCourseIdInWithCategory(@Param("courseIds") List<Long> courseIds);
}
