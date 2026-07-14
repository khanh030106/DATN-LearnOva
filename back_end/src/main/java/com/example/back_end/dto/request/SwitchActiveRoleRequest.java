package com.example.back_end.dto.request;

import com.example.back_end.entity.enums.RoleName;
import jakarta.validation.constraints.NotNull;

public record SwitchActiveRoleRequest(
        @NotNull RoleName role
) {}
