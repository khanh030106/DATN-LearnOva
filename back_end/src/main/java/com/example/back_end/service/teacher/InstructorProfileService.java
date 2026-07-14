package com.example.back_end.service;

import com.example.back_end.dto.request.UpdateInstructorProfileRequest;
import com.example.back_end.dto.response.InstructorProfileResponse;
import com.example.back_end.entity.InstructorProfile;
import com.example.back_end.entity.User;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.InstructorProfileRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Transactional
public class InstructorProfileService {

    private final InstructorProfileRepository instructorProfileRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public InstructorProfileResponse getMyProfile(String email) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return instructorProfileRepository.findById(instructor.getId())
                .map(this::toResponse)
                .orElse(new InstructorProfileResponse(null, null, null, null, null));
    }

    public InstructorProfileResponse updateMyProfile(String email, UpdateInstructorProfileRequest request) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        InstructorProfile profile = instructorProfileRepository.findById(instructor.getId())
                .orElseGet(() -> {
                    InstructorProfile created = new InstructorProfile();
                    created.setUser(instructor);
                    created.setCreatedAt(Instant.now());
                    return created;
                });

        profile.setHeadline(request.getHeadline());
        profile.setDescription(request.getDescription());
        profile.setExpertise(request.getExpertise());
        if (request.getAvatarKey() != null) {
            profile.setAvatarKey(request.getAvatarKey());
        }
        profile.setSocialLinks(request.getSocialLinks());
        profile.setUpdatedAt(Instant.now());

        instructorProfileRepository.save(profile);
        return toResponse(profile);
    }

    private InstructorProfileResponse toResponse(InstructorProfile profile) {
        return new InstructorProfileResponse(
                profile.getHeadline(),
                profile.getDescription(),
                profile.getExpertise(),
                profile.getAvatarKey(),
                profile.getSocialLinks()
        );
    }
}
