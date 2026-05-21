package com.example.back_end.service;

import com.example.back_end.entity.User;
import com.example.back_end.entity.Verificationtoken;
import com.example.back_end.entity.enums.VerificationType;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {

    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;

    @Value("${jwt.refresh-token-expiration}")
    private Long refreshTokenExpiration;

    @Transactional
    public Verificationtoken createRefreshToken(String email) {
        User user = userRepository.findByEmailAndIsDeletedFalse(email, false)
                .orElseThrow(() -> new RuntimeException("User not found"));

        verificationTokenRepository.deleteByUserAndTokenType(user, VerificationType.REFRESH_TOKEN);

        Verificationtoken refreshToken = new Verificationtoken();

        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setTokenType(VerificationType.REFRESH_TOKEN);
        refreshToken.setCreatedAt(Instant.now());
        refreshToken.setExpiredAt(OffsetDateTime.now().plus(Duration.ofMillis(refreshTokenExpiration)));
        refreshToken.setIsUsed(false);

        return verificationTokenRepository.save(refreshToken);
    }

    public Verificationtoken verifyRefreshToken(String token) {

        return verificationTokenRepository.findByTokenAndTokenTypeAndIsUsedFalse(
                token,
                VerificationType.REFRESH_TOKEN,
                false
                ).orElseThrow(() -> new RuntimeException("Refresh token expired"));
    }

    @Transactional
    public void deleteRefreshTokenByUser(User user) {
        verificationTokenRepository.deleteByUserAndTokenType(user, VerificationType.REFRESH_TOKEN);
    }
}