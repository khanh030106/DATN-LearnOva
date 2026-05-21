package com.example.back_end.repository;

import com.example.back_end.entity.User;
import com.example.back_end.entity.Verificationtoken;
import com.example.back_end.entity.enums.VerificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<Verificationtoken, Long> {
    Optional<Verificationtoken> findByTokenAndTokenTypeAndIsUsedFalse(String token, VerificationType tokenType, Boolean isUsed);

    void deleteByUserAndTokenType(User user, VerificationType tokenType);
}