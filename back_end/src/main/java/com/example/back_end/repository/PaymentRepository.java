//package com.example.back_end.repository;
//
//import com.example.back_end.entity.Payment;
//import java.util.Optional;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface PaymentRepository extends JpaRepository<Payment, Long> {
//
//    Optional<Payment> findFirstByOrderIdOrderByIdDesc(Long orderId);
//
//    Optional<Payment> findByTransactionId(String transactionId);
//}
