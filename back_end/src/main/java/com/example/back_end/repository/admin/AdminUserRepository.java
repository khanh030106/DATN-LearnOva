package com.example.back_end.repository.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;

import java.time.Instant;

@Repository
public interface AdminUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndIsDeletedFalse(String email, Boolean isDeleted);

    Optional<User> findByIdAndIsDeletedFalse(Long id);

    boolean existsUsersByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE r.roleName = :roleName")
    List<User> findAllByRoleName(@Param("roleName") RoleName roleName);

    long countByIsDeletedFalse();

    @Query(value = """
            SELECT COUNT(DISTINCT u.user_id)
            FROM users u
            JOIN userrole ur ON ur.user_id = u.user_id
            JOIN roles r ON r.role_id = ur.role_id
            WHERE u.is_deleted = false
              AND CAST(r.role_name AS text) = 'ROLE_TEACHER'
            """, nativeQuery = true)
    long countActiveTeachers();

    @Query(value = """
            SELECT CAST(r.role_name AS text) AS role_name, COUNT(DISTINCT u.user_id) AS total
            FROM users u
            JOIN userrole ur ON ur.user_id = u.user_id
            JOIN roles r ON r.role_id = ur.role_id
            WHERE u.is_deleted = false
            GROUP BY CAST(r.role_name AS text)
            """, nativeQuery = true)
    List<Object[]> countActiveUsersByRoleName();

    @Query(value = """
            SELECT
              u.user_id,
              u.full_name,
              u.email,
              COALESCE(MIN(CAST(r.role_name AS text)), 'ROLE_USER') AS role_name
            FROM users u
            LEFT JOIN userrole ur ON ur.user_id = u.user_id
            LEFT JOIN roles r ON r.role_id = ur.role_id
            WHERE u.is_deleted = false
            GROUP BY u.user_id, u.full_name, u.email, u.created_at
            ORDER BY u.created_at DESC
            LIMIT 4
            """, nativeQuery = true)
    List<Object[]> findRecentActiveUserRows();

    @Query(value = """
            SELECT CAST(EXTRACT(MONTH FROM created_at) AS int) AS month_number, COUNT(*) AS total
            FROM users
            WHERE is_deleted = false
              AND created_at >= :startAt
              AND created_at < :endAt
            GROUP BY month_number
            ORDER BY month_number
            """, nativeQuery = true)
    List<Object[]> countActiveUsersByMonth(
            @Param("startAt") Instant startAt,
            @Param("endAt") Instant endAt
    );
}
