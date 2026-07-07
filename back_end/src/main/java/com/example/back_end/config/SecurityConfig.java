package com.example.back_end.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.back_end.security.OAuth2AuthenticationSuccessHandler;
import org.springframework.http.HttpMethod;
import com.example.back_end.security.CustomUserDetailsService;
import com.example.back_end.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;


@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

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
                        .requestMatchers("/api/learnova/uploads/presigned-url").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learnova/courses/public/**").permitAll()
                        .requestMatchers("/api/learnova/courses/video-url/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learnova/courses/featured").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learnova/enrollments/check").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learnova/courses/*").permitAll()
                        .requestMatchers("/api/learnova/courses/my-courses").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learnova/courses/categories").permitAll()
                        .requestMatchers("/api/learnova/admin/users/**").permitAll()
                        .requestMatchers("/api/learnova/admin/categories-management/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers("/api/learnova/admin/courses-management/**").permitAll()
                        .requestMatchers("/api/learnova/admin/vouchers/**").permitAll()
                        .requestMatchers("/api/learnova/admin/revenue/**").permitAll()
                        .requestMatchers("/api/learnova/admin/instructors-management/**").permitAll()
                        .requestMatchers("/api/learnova/admin/tags-management/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/learnova/payments/webhook").permitAll()
                        .requestMatchers("/api/learnova/user/me").permitAll()
                        .requestMatchers("/api/learnova/review/**").permitAll()
                        .requestMatchers("/api/learnova/progress/**").permitAll()
                        .requestMatchers("/api/learnova/auth/resend-verification").permitAll()
//                        .requestMatchers("/api/learnova/api/qna/**").authenticated()
                                .requestMatchers("/api/learnova/qna/**").authenticated()
                        .requestMatchers("/error").permitAll()// để test
                        .anyRequest().authenticated()
                )

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\":\"Unauthorized\"}");
                        })
                )

                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2AuthenticationSuccessHandler)
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
