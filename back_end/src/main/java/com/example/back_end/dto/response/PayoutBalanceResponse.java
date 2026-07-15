package com.example.back_end.dto.response;

import java.math.BigDecimal;

public record PayoutBalanceResponse(
        BigDecimal lifetimeRevenue,
        BigDecimal lifetimeRefunds,
        BigDecimal pendingOrPaidPayouts,
        BigDecimal availableBalance
) {
}
