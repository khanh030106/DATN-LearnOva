package com.example.back_end.testApi;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.back_end.entity.User;
import lombok.RequiredArgsConstructor;
import com.example.back_end.testApi.repoUser;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/test")
public class testApi {
    private final repoUser repoUser;

    @GetMapping("/users")
    public List<User> getUsers() {
        return repoUser.findAllUsers();
    }
}
