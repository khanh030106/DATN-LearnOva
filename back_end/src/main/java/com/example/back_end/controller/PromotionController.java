package com.example.back_end.controller;

import com.example.back_end.dto.response.PromotionCourseResponse;
import com.example.back_end.dto.resquest.CreatePromotionRequest;
import com.example.back_end.dto.resquest.UpdatePromotionRequest;
import com.example.back_end.service.PromotionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/promotions")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @GetMapping("/my-courses")
    public List<PromotionCourseResponse> getMyPromotions(Authentication authentication) {
        return promotionService.getMyPromotions(authentication.getName());
    }

    @PostMapping
    public PromotionCourseResponse createPromotion(
            @Valid @RequestBody CreatePromotionRequest request,
            Authentication authentication
    ) {
        return promotionService.createPromotion(request, authentication.getName());
    }

    @PutMapping("/{promotionId}")
    public PromotionCourseResponse updatePromotion(
            @PathVariable Long promotionId,
            @Valid @RequestBody UpdatePromotionRequest request,
            Authentication authentication
    ) {
        return promotionService.updatePromotion(promotionId, request, authentication.getName());
    }

    @DeleteMapping("/{promotionId}")
    public ResponseEntity<Void> deletePromotion(
            @PathVariable Long promotionId,
            Authentication authentication
    ) {
        promotionService.deletePromotion(promotionId, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
