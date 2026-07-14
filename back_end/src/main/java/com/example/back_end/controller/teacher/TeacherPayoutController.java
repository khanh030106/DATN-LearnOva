package com.example.back_end.controller;

import com.example.back_end.dto.request.CreatePayoutRequestRequest;
import com.example.back_end.dto.response.PayoutBalanceResponse;
import com.example.back_end.dto.response.PayoutRequestResponse;
import com.example.back_end.service.PayoutRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/teacher/payout-requests")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherPayoutController {

    private final PayoutRequestService payoutRequestService;

    @GetMapping("/balance")
    public PayoutBalanceResponse getBalance(Authentication authentication) {
        return payoutRequestService.getBalance(authentication.getName());
    }

    @GetMapping
    public List<PayoutRequestResponse> getMyHistory(Authentication authentication) {
        return payoutRequestService.getMyHistory(authentication.getName());
    }

    @PostMapping
    public PayoutRequestResponse submit(
            @Valid @RequestBody CreatePayoutRequestRequest request,
            Authentication authentication
    ) {
        return payoutRequestService.submit(authentication.getName(), request);
    }
}
