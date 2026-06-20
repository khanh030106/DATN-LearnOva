package com.example.back_end.dto.response;

import java.time.Instant;

public record CategoryResponse(
    Long id,
    String name,
    String slug,
    Long parentId,
    String parentName,
    Integer displayOrder,
    Boolean isDeleted,
    Instant createdAt,
    Instant updatedAt
) {}