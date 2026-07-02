package com.example.back_end.repository.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;

@Repository
public interface AdminUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndIsDeletedFalse(String email, Boolean isDeleted);

    Optional<User> findByIdAndIsDeletedFalse(Long id);

    boolean existsUsersByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE r.roleName = :roleName")
    List<User> findAllByRoleName(@Param("roleName") RoleName roleName);
}
