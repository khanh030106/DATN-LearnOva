package com.example.back_end.dto.resquest;

import com.example.back_end.entity.enums.RoleName;
import jakarta.validation.constraints.NotNull;

public record SwitchActiveRoleRequest(
        @NotNull RoleName role
) {}
