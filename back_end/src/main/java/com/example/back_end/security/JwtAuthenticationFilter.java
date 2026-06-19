package com.example.back_end.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(

            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("==== JWT FILTER START ====");
        System.out.println("PATH: " + request.getServletPath());
        System.out.println("AUTH HEADER: " + request.getHeader("Authorization"));
        System.out.println("CURRENT AUTH (before): " + SecurityContextHolder.getContext().getAuthentication());
        String header = request.getHeader("Authorization");
        String path = request.getServletPath();

        if (path.startsWith("/api/learnova/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

//        if (path.startsWith("/api/learnova/review/post")) {  //test xong thì xóaaaa
//            filterChain.doFilter(request, response);
//            return;
//        }

        if (header == null || !header.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        String email;
        try {
            email = jwtService.getEmailFromToken(token);
            System.out.println("EMAIL FROM TOKEN: " + email);
        } catch (Exception e) {
            System.out.println("JWT ERROR:");
            e.printStackTrace();
            filterChain.doFilter(request, response);
            return;
        }

        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){

            System.out.println("LOADING USER: " + email);

            UserDetails userDetails =
                    customUserDetailsService.loadUserByUsername(email);

            System.out.println("USER FOUND: " + userDetails.getUsername());

            boolean valid = jwtService.isTokenValid(token, userDetails);

            System.out.println("TOKEN VALID: " + valid);

            if (valid){

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                System.out.println(
                        "AUTH AFTER SET: "
                                + SecurityContextHolder.getContext()
                                .getAuthentication()
                );
            }
        }

        filterChain.doFilter(request, response);
    }
}
