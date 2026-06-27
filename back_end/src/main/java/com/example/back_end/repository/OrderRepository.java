package com.example.back_end.repository;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.back_end.entity.Order;
import com.example.back_end.entity.enums.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByStatus(OrderStatus status);
    
    @Query(value = "SELECT oi.price FROM orderitems oi " +
                   "JOIN courses c ON c.course_id = oi.course_id " +
                   "JOIN orders o ON o.order_id = oi.order_id " +
                   "WHERE c.instructor_id = :instructorId " +
                   "AND o.status = 'PAID'", nativeQuery = true)
    List<BigDecimal> findRevenueByInstructor(@Param("instructorId") Long instructorId);
}