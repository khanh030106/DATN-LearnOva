package com.example.back_end.controller;

import com.example.back_end.dto.response.CourseResponse;
import com.example.back_end.service.WishlistService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping("/user/wishlist")
    public ResponseEntity<List<CourseResponse>> getWishlist(Authentication authentication) {
        if (!isAuthenticated(authentication)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(wishlistService.getUserWishlist(authentication.getName()));
    }

    @PostMapping("/user/wishlist/{courseId}")
    public ResponseEntity<Void> addToWishlist(
            Authentication authentication,
            @PathVariable @NotNull Long courseId
    ) {
        if (!isAuthenticated(authentication)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        wishlistService.addCourseToWishlist(authentication.getName(), courseId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/wishlist/{courseId}")
    public ResponseEntity<Void> removeFromWishlist(
            Authentication authentication,
            @PathVariable @NotNull Long courseId
    ) {
        if (!isAuthenticated(authentication)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        wishlistService.removeCourseFromWishlist(authentication.getName(), courseId);
        return ResponseEntity.noContent().build();
    }

    private boolean isAuthenticated(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated();
    }
}
