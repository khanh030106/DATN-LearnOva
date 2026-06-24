package com.example.back_end.dto.response.admin;

import java.time.Instant;

public record AdminTagResponse(
    Long id,
    String name,
    String slug,
    Boolean isDeleted,
    Instant updatedAt
) {}