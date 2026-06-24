package com.example.back_end.repository.admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.back_end.entity.User;

@Repository
public interface AdminUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndIsDeletedFalse(String email, Boolean isDeleted);

    Optional<User> findByIdAndIsDeletedFalse(Long id);

    boolean existsUsersByEmail(String email);
}
