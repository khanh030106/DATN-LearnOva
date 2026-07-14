package com.example.back_end.dto.request;

import lombok.Data;

@Data
public class RefreshTokenRequest  {
    private String refreshToken;
}