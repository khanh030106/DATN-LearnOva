package com.example.back_end.service;

import com.example.back_end.dto.response.AuthResponse;
import com.example.back_end.dto.resquest.LoginRequest;
import com.example.back_end.entity.User;
import com.example.back_end.entity.Verificationtoken;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.security.CustomUserDetails;
import com.example.back_end.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final VerificationTokenService verificationTokenService;


    public AuthResponse login(LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
                  request.getEmail(),
                  request.getPassword()
          )
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        assert userDetails != null;
        User user = userDetails.getUser();

        String accessToken = jwtService.generateAccessToken(userDetails);

        Verificationtoken refreshToken = verificationTokenService.createRefreshToken(user.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .build();

    }
}