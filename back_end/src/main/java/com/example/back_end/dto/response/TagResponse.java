package com.example.back_end.dto.response;

import java.time.Instant;

public record TagResponse(
    Long id,
    String name,
    String slug,
    Boolean isDeleted,
    Instant updatedAt
) {}