package com.example.back_end.controller.teacher;

import com.example.back_end.dto.request.teacher.CreateAnnouncementRequest;
import com.example.back_end.dto.response.teacher.AnnouncementResponse;
import com.example.back_end.service.teacher.AnnouncementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learnova/teacher/announcements")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping
    public Page<AnnouncementResponse> getMyAnnouncements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication
    ) {
        return announcementService.getMyAnnouncements(authentication.getName(), PageRequest.of(page, size));
    }

    @PostMapping
    public AnnouncementResponse createAnnouncement(
            @Valid @RequestBody CreateAnnouncementRequest request,
            Authentication authentication
    ) {
        return announcementService.createAnnouncement(request, authentication.getName());
    }
}
