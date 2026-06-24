package com.example.back_end.repository;

import com.example.back_end.dto.response.InstructorResponse;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InstructorRepository extends JpaRepository<User, Long> {

    @Query("SELECT new com.example.back_end.dto.response.InstructorResponse(u.id, u.fullName, u.email, u.avatar, u.coverImage, CAST(r.roleName AS string), u.title, u.skills, u.bio) " +
            "FROM User u JOIN u.roles r " +
            "WHERE r.roleName = :roleName AND u.isDeleted = false AND u.isActive = true")
    List<InstructorResponse> findAllByRoleName(@Param("roleName") RoleName roleName);
}
