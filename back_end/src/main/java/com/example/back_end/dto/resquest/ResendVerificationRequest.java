package com.example.back_end.dto.resquest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendVerificationRequest {
    private String email;
}