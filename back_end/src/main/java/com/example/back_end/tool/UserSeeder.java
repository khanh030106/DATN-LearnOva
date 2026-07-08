package com.example.back_end.tool;

import com.example.back_end.entity.Role;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;
import com.example.back_end.repository.RoleRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;

/**
 * One-off seeder: inserts 100 users with ROLE_USER for local testing.
 * Runs only when the "seed-users" profile is active, so it never fires
 * during normal application startup.
 *
 * Usage: mvn spring-boot:run -Dspring-boot.run.profiles=seed-users
 */
@Component
@Profile("seed-users")
@RequiredArgsConstructor
@Slf4j
public class UserSeeder implements CommandLineRunner {

    private static final int USER_COUNT = 100;
    private static final String DEFAULT_PASSWORD = "Password123!";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationContext applicationContext;

    @Override
    public void run(String... args) {
        Role userRole = roleRepository.findByRoleName(RoleName.ROLE_USER)
                .orElseThrow(() -> new IllegalStateException("ROLE_USER not found"));

        String encodedPassword = passwordEncoder.encode(DEFAULT_PASSWORD);

        int created = 0;
        for (int i = 1; i <= USER_COUNT; i++) {
            String email = "seed.user" + i + "@example.com";
            if (userRepository.existsUsersByEmail(email)) {
                continue;
            }

            User user = new User();
            user.setFullName("Seed User " + i);
            user.setEmail(email);
            user.setPasswordHash(encodedPassword);
            user.setIsActive(true);
            user.setIsDeleted(false);
            user.setCreatedAt(Instant.now());
            user.setUpdatedAt(Instant.now());
            user.getRoles().add(userRole);

            userRepository.save(user);
            created++;
        }

        log.info("Seeded {} new users with ROLE_USER (email seed.user1..{}@example.com, password: {})",
                created, USER_COUNT, DEFAULT_PASSWORD);

        System.exit(SpringApplication.exit(applicationContext, () -> 0));
    }

}
