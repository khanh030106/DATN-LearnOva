package com.example.back_end.testApi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import com.example.back_end.entity.User;

public interface repoUser extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u")
    List<User> findAllUsers();
}