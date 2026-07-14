package com.example.back_end.controller.teacher;

import com.example.back_end.dto.response.teacher.PromotionCourseResponse;
import com.example.back_end.dto.request.teacher.CreatePromotionRequest;
import com.example.back_end.dto.request.teacher.UpdatePromotionRequest;
import com.example.back_end.service.teacher.PromotionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/promotions")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
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
