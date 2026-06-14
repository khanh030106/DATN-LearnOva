package com.example.back_end.scheduler;

import com.example.back_end.service.VerificationTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class CleanupRefreshTokenByScheduler {

    private final VerificationTokenService verificationTokenService;

    @Scheduled(cron = "0 0 3 * * *", zone = "Asia/Ho_Chi_Minh")
    public void cleanupExpiredRefreshTokens() {
        int deletedCount = verificationTokenService.deleteExpiredRefreshTokens();

        log.info("Deleted " + deletedCount + " expired refresh tokens");    }
}
