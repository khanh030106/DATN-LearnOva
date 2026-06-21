package com.example.back_end.service.admin;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.back_end.dto.resquest.admin.UserRequest;
import com.example.back_end.dto.response.UserResponse;
import com.example.back_end.entity.Role;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;
import com.example.back_end.repository.RoleRepository;
import com.example.back_end.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(user -> {
                String roleText = user.getRoles()
                    .stream()
                    .map(role -> role.getRoleName().name().replace("ROLE_", ""))
                    .findFirst()
                    .orElse("USER");

                String statusText = Boolean.TRUE.equals(user.getIsActive()) ? "Active" : "Inactive";

                return new UserResponse(
                    user.getId(),
                    user.getFullName(),
                    user.getEmail(),
                    user.getPhone(),
                    user.getAvatar(),
                    user.getCoverImage(),
                    user.getDateOfBirth(),
                    user.getGender(),
                    roleText,
                    statusText,
                    user.getCreatedAt(),
                    user.getIsDeleted(),
                    user.getUpdatedAt()
                );
            })
            .toList();
    }

    public UserResponse createUser(UserRequest request) {
        if (request.password() == null || request.password().isBlank()) {
            throw new RuntimeException("Password is required");
        }

        String normalizedRole = request.role() == null
            ? "USER"
            : request.role().replace("ROLE_", "").trim().toUpperCase();

        RoleName roleName = switch (normalizedRole) {
            case "ADMIN" -> RoleName.ROLE_ADMIN;
            case "TEACHER", "INSTRUCTOR" -> RoleName.ROLE_TEACHER;
            default -> RoleName.ROLE_USER;
        };

        Role role = roleRepository.findByRoleName(roleName)
            .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setAvatar(request.avatar());
        user.setCoverImage(request.coverImage());
        user.setDateOfBirth(request.dateOfBirth());
        user.setGender(request.gender());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setIsActive(request.isActive() != null ? request.isActive() : true);
        user.setIsDeleted(request.isDeleted() != null ? request.isDeleted() : false);
        user.setRoles(new LinkedHashSet<>(List.of(role)));
        Instant now = Instant.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        User savedUser = userRepository.save(user);

        String roleText = savedUser.getRoles()
            .stream()
            .map(savedRole -> savedRole.getRoleName().name().replace("ROLE_", ""))
            .findFirst()
            .orElse("USER");

        String statusText = Boolean.TRUE.equals(savedUser.getIsActive()) ? "Active" : "Inactive";

        return new UserResponse(
            savedUser.getId(),
            savedUser.getFullName(),
            savedUser.getEmail(),
            savedUser.getPhone(),
            savedUser.getAvatar(),
            savedUser.getCoverImage(),
            savedUser.getDateOfBirth(),
            savedUser.getGender(),
            roleText,
            statusText,
            savedUser.getCreatedAt(),
            savedUser.getIsDeleted(),
            savedUser.getUpdatedAt()
        );
    }

    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.fullName() != null) {
            user.setFullName(request.fullName());
        }
        if (request.phone() != null) {
            user.setPhone(request.phone());
        }
        if (request.avatar() != null) {
            user.setAvatar(request.avatar());
        }
        if (request.coverImage() != null) {
            user.setCoverImage(request.coverImage());
        }
        if (request.dateOfBirth() != null) {
            user.setDateOfBirth(request.dateOfBirth());
        }
        if (request.gender() != null) {
            user.setGender(request.gender());
        }
        if (request.password() != null && !request.password().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.password()));
        }
        if (request.isActive() != null) {
            user.setIsActive(request.isActive());
        }
        if (request.isDeleted() != null) {
            user.setIsDeleted(request.isDeleted());
        }
        if (request.role() != null) {
            String normalizedRole = request.role().replace("ROLE_", "").trim().toUpperCase();

            RoleName roleName = switch (normalizedRole) {
                case "ADMIN" -> RoleName.ROLE_ADMIN;
                case "TEACHER", "INSTRUCTOR" -> RoleName.ROLE_TEACHER;
                default -> RoleName.ROLE_USER;
            };

            Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

            user.setRoles(new LinkedHashSet<>(List.of(role)));
        }

        user.setUpdatedAt(Instant.now());

        User updatedUser = userRepository.save(user);

        String roleText = updatedUser.getRoles()
            .stream()
            .map(role -> role.getRoleName().name().replace("ROLE_", ""))
            .findFirst()
            .orElse("USER");

        String statusText = Boolean.TRUE.equals(updatedUser.getIsActive()) ? "Active" : "Inactive";

        return new UserResponse(
            updatedUser.getId(),
            updatedUser.getFullName(),
            updatedUser.getEmail(),
            updatedUser.getPhone(),
            updatedUser.getAvatar(),
            updatedUser.getCoverImage(),
            updatedUser.getDateOfBirth(),
            updatedUser.getGender(),
            roleText,
            statusText,
            updatedUser.getCreatedAt(),
            updatedUser.getIsDeleted(),
            updatedUser.getUpdatedAt()
        );
    }

    public void deleteUser(Long id) {
        User user = userRepository.findByIdAndIsDeletedFalse(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsDeleted(true);
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);
    }
}