package com.example.back_end.service;

import com.example.back_end.dto.request.CreateNotificationRequest;
import com.example.back_end.dto.response.NotificationResponse;
import com.example.back_end.entity.Notification;
import com.example.back_end.entity.User;
import com.example.back_end.repository.NotificationRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public Notification createNotification(CreateNotificationRequest req) {
        User user = userRepository.findByIdAndIsDeletedFalse(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification n = new Notification();
        n.setUser(user);
        n.setTitle(req.getTitle());
        n.setContent(req.getContent());
        n.setIsRead(false);
        n.setCreatedAt(Instant.now());

        return notificationRepository.save(n);
    }

    public List<NotificationResponse> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public long countUnread(Long userId) {
        return notificationRepository.countByUser_IdAndIsReadFalse(userId);
    }

    public void markAsRead(Long notificationId, Long userId) {
        Notification n = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        if (!n.getUser().getId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }
        n.setIsRead(true);
        notificationRepository.save(n);
    }

    private NotificationResponse toResponse(Notification n) {
        NotificationResponse r = new NotificationResponse();
        r.setId(n.getId());
        r.setTitle(n.getTitle());
        r.setContent(n.getContent());
        r.setIsRead(n.getIsRead());
        r.setCreatedAt(n.getCreatedAt());
        return r;
    }
}
