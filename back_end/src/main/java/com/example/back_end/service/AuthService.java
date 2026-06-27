package com.example.back_end.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.back_end.dto.response.AuthTokenResponse;
import com.example.back_end.dto.response.CurrentUserResponse;
import com.example.back_end.dto.response.LoginResponse;
import com.example.back_end.dto.resquest.LoginRequest;
import com.example.back_end.entity.Role;
import com.example.back_end.entity.User;
import com.example.back_end.entity.Verificationtoken;
import com.example.back_end.entity.enums.RoleName;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.security.CustomUserDetailsService;
import com.example.back_end.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import java.util.Optional;
import java.util.Set;
import com.example.back_end.dto.resquest.RegisterRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.Instant;


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

    @Value("${app.frontend.base-url}")
    private String frontendBaseUrl;


    @Transactional
    public AuthTokenResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.email().trim().toLowerCase(),
                request.password()
            )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        if (userDetails == null) {
            throw new BusinessException("Authentication failed");
        }

        String accessToken = jwtService.generateAccessToken(userDetails);
        Verificationtoken refreshToken = verificationTokenService.createRefreshToken(userDetails.getUsername(), request.rememberMe());

        return new AuthTokenResponse(accessToken, refreshToken.getToken());
    }

    // Rotates the refresh token on every use — a stolen token can only be used once.
    @Transactional
    public AuthTokenResponse refreshAccessToken(String refreshToken) {
        Verificationtoken validRefreshToken = verificationTokenService.verifyRefreshToken(refreshToken);

        User user = validRefreshToken.getUser();
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        String newAccessToken = jwtService.generateAccessToken(userDetails);

        verificationTokenService.deleteRefreshTokenByUser(user);
        String newRefreshToken = verificationTokenService.createRefreshToken(user.getEmail(), false).getToken();

        return new AuthTokenResponse(newAccessToken, newRefreshToken);
    }

    // Always succeeds — even if the token is expired or unknown.
    @Transactional
    public void logout(String refreshToken) {
        if (refreshToken == null) {
            return;
        }
        try {
            Verificationtoken token = verificationTokenService.verifyRefreshToken(refreshToken);
            verificationTokenService.deleteRefreshTokenByUser(token.getUser());
        } catch (Exception ignored) {
            // Token already expired or not found — still a valid logout.
        }
    }

    public CurrentUserResponse getCurrentUser(String email) {
        User user = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Set<RoleName> roleNames = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(java.util.stream.Collectors.toSet());

        return new CurrentUserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getAvatar(),
                user.getCoverImage(),
                user.getDateOfBirth(),
                user.getGender(),
                roleNames
        );
    }

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsUsersByEmail(request.email())) {
            throw new BusinessException("Email already exists.");
        }
        if (request.password() == null || request.password().length() < 6) {
            throw new BusinessException("Password must be at least 6 characters long.");
        }
        if (!request.password().equals(request.confirmPassword())) {
            throw new BusinessException("Passwords do not match.");
        }

        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setIsActive(false);
        user.setIsDeleted(false);
        user.setCreatedAt(Instant.now());

        User savedUser = userRepository.save(user);

        Verificationtoken verificationToken = verificationTokenService.createActiveAccountToken(savedUser);

        String verifyLink = frontendBaseUrl + "/learnova/auth/login?token=" + verificationToken.getToken();

        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getFullName(), verifyLink);
    }

    @Transactional
    public void verifyEmail(String token) {
        // Expiry is now checked inside verifyActiveAccountToken.
        Verificationtoken verificationToken = verificationTokenService.verifyActiveAccountToken(token);

        User user = verificationToken.getUser();
        user.setIsActive(true);
        userRepository.save(user);

        verificationTokenService.markAsUsed(verificationToken);
    }

    @Transactional
    public void resendVerificationEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmailAndIsDeletedFalse(email.trim().toLowerCase());

        // Do not reveal whether the email is registered or already verified.
        if (userOpt.isEmpty() || Boolean.TRUE.equals(userOpt.get().getIsActive())) {
            return;
        }

        User user = userOpt.get();
        Verificationtoken verificationToken = verificationTokenService.createActiveAccountToken(user);
        String verifyLink = frontendBaseUrl + "/learnova/auth/login?token=" + verificationToken.getToken();

        emailService.sendVerificationEmail(user.getEmail(), user.getFullName(), verifyLink);
    }
}
