package com.example.back_end.repository;

import com.example.back_end.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndIsDeletedFalse(String email, Boolean isDeleted);

    Optional<User> findByIdAndIsDeletedFalse(Long id);

    boolean existsUsersByEmail(String email);

    List<User> findByIsDeletedFalse();
}