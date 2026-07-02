package com.example.back_end.service;

import com.example.back_end.entity.User;
import com.example.back_end.entity.Verificationtoken;
import com.example.back_end.entity.enums.VerificationType;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
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
        User user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

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
        Verificationtoken refreshToken = verificationTokenRepository
                .findByTokenAndTokenTypeAndIsUsedFalse(token, VerificationType.REFRESH_TOKEN)
                .orElseThrow(() -> new BusinessException("Token not found"));

        if (refreshToken.getExpiredAt().isBefore(OffsetDateTime.now())) {
            throw new BusinessException("Refresh token expired");
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

    @Transactional
    public Verificationtoken createActiveAccountToken(User user) {
        verificationTokenRepository.deleteByUserAndTokenType(user, VerificationType.ACTIVE_ACCOUNT);

        Verificationtoken token = new Verificationtoken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setTokenType(VerificationType.ACTIVE_ACCOUNT);
        token.setCreatedAt(Instant.now());
        token.setExpiredAt(OffsetDateTime.now().plusMinutes(30));
        token.setIsUsed(false);
        return verificationTokenRepository.save(token);
    }

    // Expiry is checked here, consistent with verifyRefreshToken.
    public Verificationtoken verifyActiveAccountToken(String token) {
        Verificationtoken verificationToken = verificationTokenRepository
                .findByTokenAndTokenTypeAndIsUsedFalse(token, VerificationType.ACTIVE_ACCOUNT)
                .orElseThrow(() -> new BusinessException("Invalid or already used activation link"));

        if (verificationToken.getExpiredAt().isBefore(OffsetDateTime.now())) {
            throw new BusinessException("Activation link has expired. Please request a new one.");
        }

        return verificationToken;
    }

    @Transactional
    public void markAsUsed(Verificationtoken token) {
        token.setIsUsed(true);
        verificationTokenRepository.save(token);
    }
}
