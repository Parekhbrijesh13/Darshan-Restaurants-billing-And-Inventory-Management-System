package com.darshan.backend.billing.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record CheckoutResponse(
    Long orderId,
    String billNo,
    String status,
    BigDecimal subtotal,
    BigDecimal gstAmount,
    BigDecimal totalAmount,
    Instant createdAt
) {}
