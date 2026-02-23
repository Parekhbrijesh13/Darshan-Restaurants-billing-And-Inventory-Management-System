package com.darshan.backend.inventory.dto;

import java.math.BigDecimal;

public record InventoryResponse(
    Long productId,
    String productName,
    String category,
    BigDecimal quantity,
    BigDecimal lowStockThreshold,
    boolean lowStock
) {}
