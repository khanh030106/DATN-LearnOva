package com.example.back_end.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.back_end.entity.Coursetag;
import com.example.back_end.entity.CoursetagId;

public interface CoursetagRepository extends JpaRepository<Coursetag, CoursetagId> {

    @Query("SELECT ct FROM Coursetag ct JOIN FETCH ct.course")
    List<Coursetag> findAllWithCourse();

    @Query("SELECT ct FROM Coursetag ct JOIN FETCH ct.course WHERE ct.id.tagId = :tagId")
    List<Coursetag> findByTagIdWithCourse(@Param("tagId") Long tagId);

    @Query("SELECT ct FROM Coursetag ct WHERE ct.id.tagId = :tagId")
    List<Coursetag> findByTagId(@Param("tagId") Long tagId);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Coursetag ct WHERE ct.id.tagId = :tagId")
    void deleteByTagId(@Param("tagId") Long tagId);
}
