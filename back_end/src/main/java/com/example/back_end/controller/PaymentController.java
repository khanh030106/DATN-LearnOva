//package com.example.back_end.controller;
//
//import com.example.back_end.dto.response.CreatePaymentResponse;
//import com.example.back_end.dto.response.PaymentStatusResponse;
//import com.example.back_end.dto.resquest.CreatePaymentRequest;
//import com.example.back_end.service.PaymentService;
//import com.fasterxml.jackson.databind.JsonNode;
//import jakarta.validation.Valid;
//import java.util.Map;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/learnova/payments")
//public class PaymentController {
//
//    private final PaymentService paymentService;
//
//    @PostMapping("/create")
//    public ResponseEntity<CreatePaymentResponse> createPayment(@Valid @RequestBody CreatePaymentRequest request) {
//        return ResponseEntity.ok(paymentService.createPayment(request));
//    }
//
//    @GetMapping("/status/{orderId}")
//    public ResponseEntity<PaymentStatusResponse> getPaymentStatus(@PathVariable Long orderId) {
//        return ResponseEntity.ok(paymentService.getPaymentStatus(orderId));
//    }
//
//    @PostMapping("/webhook")
//    public ResponseEntity<Map<String, Object>> payOSWebhook(@RequestBody JsonNode body) {
//        if (!paymentService.verifyPayOSWebhook(body)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", "invalid signature"));
//        }
//
//        paymentService.handlePayOSWebhook(body);
//        return ResponseEntity.ok(Map.of("message", "success"));
//    }
//}
