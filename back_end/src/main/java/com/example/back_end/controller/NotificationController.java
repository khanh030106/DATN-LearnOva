package com.example.back_end.controller;

import com.example.back_end.dto.request.CreateNotificationRequest;
import com.example.back_end.dto.response.NotificationResponse;
import com.example.back_end.security.CustomUserDetails;
import com.example.back_end.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/learnova")
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping("/notification/create")
    public NotificationResponse createNotification(@Valid @RequestBody CreateNotificationRequest req) {
        return toResponse(notificationService.createNotification(req));
    }

    @GetMapping("/user/notifications")
    public List<NotificationResponse> getNotifications(Authentication authentication) {
        if (authentication == null) throw new RuntimeException("No authentication");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return notificationService.getNotificationsForUser(userDetails.getId());
    }

    @GetMapping("/user/notifications/unread-count")
    public long unreadCount(Authentication authentication) {
        if (authentication == null) throw new RuntimeException("No authentication");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return notificationService.countUnread(userDetails.getId());
    }

    @PutMapping("/user/notifications/{id}/read")
    public void markAsRead(Authentication authentication, @PathVariable Long id) {
        if (authentication == null) throw new RuntimeException("No authentication");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        notificationService.markAsRead(id, userDetails.getId());
    }

    private NotificationResponse toResponse(com.example.back_end.entity.Notification n) {
        NotificationResponse r = new NotificationResponse();
        r.setId(n.getId());
        r.setTitle(n.getTitle());
        r.setContent(n.getContent());
        r.setIsRead(n.getIsRead());
        r.setCreatedAt(n.getCreatedAt());
        return r;
    }
}
