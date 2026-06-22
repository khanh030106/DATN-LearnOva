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
        // Tuân thủ 3 tham số từ Repository của bạn đóng gói, truyền Boolean.FALSE tường minh
        return verificationTokenRepository.findByTokenAndTokenTypeAndIsUsedFalse(
                token,
                VerificationType.REFRESH_TOKEN,
                Boolean.FALSE
        ).orElseThrow(() -> new RuntimeException("Refresh token expired"));
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
        verificationTokenRepository.deleteByUserAndTokenType(
                user,
                VerificationType.ACTIVE_ACCOUNT
        );

        Verificationtoken token = new Verificationtoken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setTokenType(VerificationType.ACTIVE_ACCOUNT);
        token.setCreatedAt(Instant.now());
        token.setExpiredAt(OffsetDateTime.now().plusMinutes(5));
        token.setIsUsed(false);

        return verificationTokenRepository.save(token);
    }

    public Verificationtoken verifyActiveAccountToken(String token) {
        // Tuân thủ 3 tham số từ Repository của bạn đóng gói, truyền Boolean.FALSE tường minh
        return verificationTokenRepository
                .findByTokenAndTokenTypeAndIsUsedFalse(
                        token,
                        VerificationType.ACTIVE_ACCOUNT,
                        Boolean.FALSE
                )
                .orElseThrow(() -> new RuntimeException("Invalid activation token"));
    }

    @Transactional
    public void markAsUsed(Verificationtoken token) {
        token.setIsUsed(true);
        verificationTokenRepository.save(token);
    }
}