package com.example.back_end.service;

import com.example.back_end.dto.response.InstructorResponse;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.RoleName;
import com.example.back_end.repository.InstructorRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final InstructorRepository instructorRepository;

    public User updateUser(Long id, User request) {
        User user = userRepository
                .findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAvatar(request.getAvatar());
        user.setCoverImage(request.getCoverImage());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setGender(request.getGender());
        user.setUpdatedAt(Instant.now());

        return userRepository.save(user);
    }
    public List<InstructorResponse> getInstructors() {
        return instructorRepository.findAllByRoleName(RoleName.ROLE_TEACHER);
    }
}
