package com.example.back_end.repository;

import com.example.back_end.entity.Orderitem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderitemRepository extends JpaRepository<Orderitem, Long> {

    @Query("SELECT oi FROM Orderitem oi JOIN FETCH oi.order WHERE oi.course.id IN :courseIds")
    List<Orderitem> findByCourseIdInWithOrder(@Param("courseIds") List<Long> courseIds);
}
