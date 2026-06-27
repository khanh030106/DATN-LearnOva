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

    @Value("${jwt.refresh-token-remember-expiration}")
    private Long refreshTokenRememberExpiration;

    @Transactional
    public Verificationtoken createRefreshToken(String email, Boolean rememberMe) {
        User user = userRepository.findByEmailAndIsDeletedFalse(email, false)
                .orElseThrow(() -> new RuntimeException("User not found"));

        verificationTokenRepository.deleteByUserAndTokenType(user, VerificationType.REFRESH_TOKEN);

        Long expiration = Boolean.TRUE.equals(rememberMe) ? refreshTokenRememberExpiration : refreshTokenExpiration;

        Verificationtoken refreshToken = new Verificationtoken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setTokenType(VerificationType.REFRESH_TOKEN);
        refreshToken.setCreatedAt(Instant.now());
        refreshToken.setExpiredAt(OffsetDateTime.now().plus(Duration.ofMillis(expiration)));
        refreshToken.setIsUsed(false);

        return verificationTokenRepository.save(refreshToken);
    }

    public Verificationtoken verifyRefreshToken(String token) {
        Verificationtoken refreshToken = verificationTokenRepository.findByTokenAndTokenTypeAndIsUsedFalse(
                token,
                VerificationType.REFRESH_TOKEN
                )
                .orElseThrow(() -> new RuntimeException("Token not found"));

        if (refreshToken.getExpiredAt().isBefore(OffsetDateTime.now())) {
            throw new RuntimeException("refresh token expired");
        }

        return refreshToken;
    }

    @Transactional
    public void deleteRefreshTokenByUser(User user) {
        verificationTokenRepository.deleteByUserAndTokenType(user, VerificationType.REFRESH_TOKEN);
    }

    @Transactional
    public int deleteExpiredRefreshTokens() {
        return verificationTokenRepository.deleteExpiredTokens(
                VerificationType.REFRESH_TOKEN,
                OffsetDateTime.now()
        );
    }
}