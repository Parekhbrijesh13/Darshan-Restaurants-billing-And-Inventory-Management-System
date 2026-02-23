package com.darshan.backend.billing.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record OrderSummaryResponse(
    Long id,
    String billNo,
    String customerName,
    String status,
    BigDecimal totalAmount,
    Instant createdAt
) {}
