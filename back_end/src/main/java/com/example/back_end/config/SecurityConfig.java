package com.example.back_end.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

import com.example.back_end.security.CustomUserDetailsService;
import com.example.back_end.security.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/learnova/auth/**").permitAll()
                        .requestMatchers("/api/learnova/admin/users/**").permitAll()
                        .requestMatchers("/api/learnova/admin/categories-management/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers("/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers("/api/learnova/admin/vouchers/**").permitAll()
                        .requestMatchers("/api/learnova/admin/instructors-management/**").permitAll()
                        .requestMatchers("/api/learnova/admin/tags-management/**").permitAll()
                        .requestMatchers("/api/learnova/user/me").permitAll()
                        .requestMatchers("/api/learnova/review/post").permitAll()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(customUserDetailsService);

        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
