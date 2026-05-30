package com.example.back_end.dto.response;

import java.time.LocalDate;

public record CurrentUserResponse(
        Long id,
        String fullName,
        String email,
        String avatar,
        LocalDate dateOfBirth
) {}