package com.example.back_end.controller.admin;

import com.example.back_end.dto.resquest.RejectPayoutRequestRequest;
import com.example.back_end.dto.response.PayoutRequestResponse;
import com.example.back_end.service.PayoutRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/admin/payout-requests")
@RequiredArgsConstructor
public class AdminPayoutController {

    private final PayoutRequestService payoutRequestService;

    @GetMapping
    public List<PayoutRequestResponse> listAll() {
        return payoutRequestService.listAll();
    }

    @GetMapping("/{id}")
    public PayoutRequestResponse getById(@PathVariable Long id) {
        return payoutRequestService.getById(id);
    }

    @PatchMapping("/{id}/mark-paid")
    public PayoutRequestResponse markPaid(@PathVariable Long id) {
        return payoutRequestService.markPaid(id);
    }

    @PatchMapping("/{id}/reject")
    public PayoutRequestResponse reject(
            @PathVariable Long id,
            @Valid @RequestBody RejectPayoutRequestRequest request
    ) {
        return payoutRequestService.reject(id, request.reason());
    }
}
