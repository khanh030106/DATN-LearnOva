package com.example.back_end.service;

import com.example.back_end.dto.response.AuthTokenResponse;
import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.dto.response.LoginResponse;
import com.example.back_end.dto.resquest.LoginRequest;
import com.example.back_end.entity.User;
import com.example.back_end.entity.Verificationtoken;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.security.CustomUserDetailsService;
import com.example.back_end.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.resquest.RegisterRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.Instant;
import java.time.OffsetDateTime;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final VerificationTokenService verificationTokenService;
    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;


    @Transactional
    public AuthTokenResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        assert userDetails != null;
        String accessToken = jwtService.generateAccessToken(userDetails);
        Verificationtoken refreshToken = verificationTokenService.createRefreshToken(userDetails.getUsername(), request.rememberMe());

        return new AuthTokenResponse(
                accessToken,
                refreshToken.getToken()
        );
    }

    @Transactional
    public LoginResponse refreshAccessToken(String refreshToken) {
        Verificationtoken validRefreshToken = verificationTokenService.verifyRefreshToken(refreshToken);

        User user = validRefreshToken.getUser();
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        String newAccessToken = jwtService.generateAccessToken(userDetails);
        return new LoginResponse(newAccessToken);
    }

    @Transactional
    public void logout(String refreshToken) {
        if (refreshToken == null) {
            return;
        }
        Verificationtoken validRefreshToken = verificationTokenService.verifyRefreshToken(refreshToken);
        verificationTokenService.deleteRefreshTokenByUser(validRefreshToken.getUser());
    }

    public CurrentUserResponse getCurrentUser(String email) {

        User user = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new CurrentUserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getAvatar(),
                user.getDateOfBirth()
        );
    }
    @Transactional
    public void register(RegisterRequest request) {
        // Check email exists
        if (userRepository.existsUsersByEmail(request.email())) {
            throw new RuntimeException("Email already exists.");
        }
        // Check password length
        if (request.password() == null || request.password().length() < 6) {
            throw new RuntimeException(
                    "Password must be at least 6 characters long."
            );
        }
        // Check confirm password
        if (!request.password().equals(request.confirmPassword())) {
            throw new RuntimeException(
                    "Passwords do not match."
            );
        }

        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPasswordHash(
                passwordEncoder.encode(request.password())
        );
        // Account is inactive until email verification
        user.setIsActive(false);
        user.setIsDeleted(false);
        user.setCreatedAt(Instant.now());

        User savedUser = userRepository.save(user);

        Verificationtoken verificationToken =
                verificationTokenService.createActiveAccountToken(
                        savedUser
                );

        String verifyLink =
                "http://localhost:5173/learnova/auth/login?token="
                        + verificationToken.getToken();
        System.out.println("=== USER SAVED ===");
        System.out.println("EMAIL: " + savedUser.getEmail());

        System.out.println("=== TOKEN CREATED ===");
        System.out.println(verificationToken.getToken());

        System.out.println("=== CALLING EMAIL SERVICE ===");

        emailService.sendVerificationEmail(
                savedUser.getEmail(),
                savedUser.getFullName(),
                verifyLink
        );
    }
    @Transactional
    public void verifyEmail(String token) {

        Verificationtoken verificationToken =
                verificationTokenService.verifyActiveAccountToken(token);

        if (verificationToken.getExpiredAt().isBefore(OffsetDateTime.now())) {
            throw new RuntimeException("Activation token expired");
        }

        User user = verificationToken.getUser();

        user.setIsActive(true);
        userRepository.save(user);

        verificationToken.setIsUsed(true);
        verificationTokenService.markAsUsed(verificationToken);
    }
    @Transactional
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmailAndIsDeletedFalse(
                email.trim().toLowerCase()
        ).orElseThrow(() -> new RuntimeException("Email không tồn tại trên hệ thống."));
        if (user.getIsActive()) {
            throw new RuntimeException("Tài khoản này đã được kích hoạt trước đó.");
        }
        Verificationtoken verificationToken = verificationTokenService.createActiveAccountToken(user);
        String verifyLink = "http://localhost:5173/learnova/auth/login?token=" + verificationToken.getToken();

        emailService.sendVerificationEmail(
                user.getEmail(),
                user.getFullName(),
                verifyLink
        );
    }

}