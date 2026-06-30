package com.example.back_end.dto.resquest;

import com.example.back_end.entity.enums.GenderType;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UpdateProfileRequest(

        @Size(min = 2, max = 100)
        String fullName,

        @Size(max = 20)
        String phone,

        LocalDate dateOfBirth,

        GenderType gender

) {
}