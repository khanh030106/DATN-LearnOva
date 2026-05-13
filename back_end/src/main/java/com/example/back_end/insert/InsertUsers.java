package com.example.back_end.insert;

import com.example.back_end.entity.Role;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.GenderType;
import com.example.back_end.entity.enums.RoleName;
import jakarta.persistence.EntityManager;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.support.TransactionTemplate;

import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.LocalDate;

@SpringBootApplication(scanBasePackages = { "com.example.back_end.insert" })
@org.springframework.boot.persistence.autoconfigure.EntityScan(basePackages = { "com.example.back_end.entity" })
public class InsertUsers {

    public static void main(String[] args) {
        loadEnv();

        // SecurityConfig
        ApplicationContext context = new SpringApplicationBuilder(InsertUsers.class)
                .web(WebApplicationType.NONE)
                .run(args);

        EntityManager entityManager = context.getBean(EntityManager.class);
        TransactionTemplate transactionTemplate = context.getBean(TransactionTemplate.class);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String defaultPassword = encoder.encode("00000000");

        transactionTemplate.execute(status -> {
            try {
                // Lấy hoặc tạo Role
                Role adminRole = getOrCreateRole(entityManager, RoleName.ROLE_ADMIN);
                Role userRole = getOrCreateRole(entityManager, RoleName.ROLE_USER);
                Role teacherRole = getOrCreateRole(entityManager, RoleName.ROLE_TEACHER);

                // Insert User 1: admin0
                createUserIfNotExists(entityManager, "admin0", "admin@gmail.com", defaultPassword,
                        "0123456789", "https://example.com/avatar/admin.png", "https://example.com/cover/admin.png",
                        LocalDate.of(1990, 1, 1), GenderType.Male, adminRole);

                // Insert User 2: user0
                createUserIfNotExists(entityManager, "user0", "user@gmail.com", defaultPassword,
                        "0987654321", "https://example.com/avatar/user.png", "https://example.com/cover/user.png",
                        LocalDate.of(1995, 5, 15), GenderType.Female, userRole);

                // Insert User 3: teacher0
                createUserIfNotExists(entityManager, "teacher0", "teacher@gmail.com", defaultPassword,
                        "0369852147", "https://example.com/avatar/teacher.png", "https://example.com/cover/teacher.png",
                        LocalDate.of(1985, 10, 20), GenderType.Other, teacherRole);

                System.out.println("Data insertion completed successfully!");
            } catch (Exception e) {
                status.setRollbackOnly();
                System.err.println("Error inserting data: " + e.getMessage());
                e.printStackTrace();
            }
            return null;
        });

        System.exit(0);
    }

    private static void loadEnv() {
        try {
            Path envPath = Paths.get(".env");
            if (Files.exists(envPath)) {
                try (BufferedReader br = new BufferedReader(new FileReader(envPath.toFile()))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        if (line.trim().isEmpty() || line.startsWith("#"))
                            continue;
                        String[] parts = line.split("=", 2);
                        if (parts.length == 2) {
                            String key = parts[0].trim();
                            String value = parts[1].trim();
                            if (System.getProperty(key) == null) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Could not load .env file: " + e.getMessage());
        }
    }

    private static Role getOrCreateRole(EntityManager entityManager, RoleName roleName) {
        try {
            return entityManager.createQuery("SELECT r FROM Role r WHERE r.roleName = :roleName", Role.class)
                    .setParameter("roleName", roleName)
                    .getSingleResult();
        } catch (Exception e) {
            Role role = new Role();
            role.setRoleName(roleName);
            entityManager.persist(role);
            return role;
        }
    }

    private static void createUserIfNotExists(EntityManager entityManager, String fullName, String email,
            String password, String phone, String avatar, String coverImage,
            LocalDate dob, GenderType gender, Role role) {
        try {
            entityManager.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
                    .setParameter("email", email)
                    .getSingleResult();
            System.out.println(" User with email " + email + " already exists. Skipping insertion.");
        } catch (Exception e) {
            User user = new User();
            user.setFullName(fullName);
            user.setEmail(email);
            user.setPasswordHash(password);
            user.setPhone(phone);
            user.setAvatar(avatar);
            user.setCoverImage(coverImage);
            user.setDateOfBirth(dob);
            user.setGender(gender);
            user.setIsActive(true);
            user.setIsDeleted(false);
            user.setCreatedAt(Instant.now());
            user.setUpdatedAt(Instant.now());

            user.getRoles().add(role);

            entityManager.persist(user);
            System.out.println("Inserted user: " + email);
        }
    }
}
