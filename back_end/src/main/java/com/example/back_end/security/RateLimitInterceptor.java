package com.example.back_end.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import java.util.LinkedList;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private static final int    LOGIN_MAX        = 5;
    private static final long   LOGIN_WINDOW_MS  = 60_000L;

    private static final int    REGISTER_MAX       = 10;
    private static final long   REGISTER_WINDOW_MS = 600_000L;

    private static final int    RESEND_MAX       = 3;
    private static final long   RESEND_WINDOW_MS = 3_600_000L;

    // key = "path:ip" → sorted list of request timestamps
    private final ConcurrentHashMap<String, LinkedList<Long>> tracker = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String path = request.getServletPath();

        int maxRequests;
        long windowMs;

        if (path.endsWith("/login")) {
            maxRequests = LOGIN_MAX;
            windowMs    = LOGIN_WINDOW_MS;
        } else if (path.endsWith("/register")) {
            maxRequests = REGISTER_MAX;
            windowMs    = REGISTER_WINDOW_MS;
        } else if (path.endsWith("/resend-verification")) {
            maxRequests = RESEND_MAX;
            windowMs    = RESEND_WINDOW_MS;
        } else {
            return true;
        }

        String key = path + ":" + resolveClientIp(request);

        if (isRateLimited(key, maxRequests, windowMs)) {
            response.setStatus(429);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"message\":\"Too many requests. Please try again later.\"}");
            return false;
        }

        return true;
    }

    private boolean isRateLimited(String key, int maxRequests, long windowMs) {
        long now    = System.currentTimeMillis();
        long cutoff = now - windowMs;

        LinkedList<Long> timestamps = tracker.computeIfAbsent(key, k -> new LinkedList<>());

        synchronized (timestamps) {
            timestamps.removeIf(t -> t < cutoff);
            if (timestamps.size() >= maxRequests) {
                return true;
            }
            timestamps.add(now);
            return false;
        }
    }

    private String resolveClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        String xri = request.getHeader("X-Real-IP");
        if (xri != null && !xri.isBlank()) {
            return xri.trim();
        }
        return request.getRemoteAddr();
    }

    // Prune empty/expired buckets every 5 minutes to prevent unbounded map growth.
    @Scheduled(fixedRate = 300_000L)
    public void evictExpiredBuckets() {
        long cutoff = System.currentTimeMillis() - RESEND_WINDOW_MS; // widest window
        tracker.entrySet().removeIf(entry -> {
            synchronized (entry.getValue()) {
                entry.getValue().removeIf(t -> t < cutoff);
                return entry.getValue().isEmpty();
            }
        });
    }
}
