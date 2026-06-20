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
import com.example.back_end.entity.User;
import com.example.back_end.entity.Verificationtoken;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.security.CustomUserDetailsService;
import com.example.back_end.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final VerificationTokenService verificationTokenService;
    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;


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

        User user = userRepository.findByEmailAndIsDeletedFalse(email, false).orElseThrow(() -> new RuntimeException("User not found"));


        return new CurrentUserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getAvatar(),
                user.getDateOfBirth()
        );
    }
}