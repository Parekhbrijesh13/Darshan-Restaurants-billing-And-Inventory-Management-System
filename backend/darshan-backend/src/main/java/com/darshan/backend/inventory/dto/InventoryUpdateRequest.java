package com.darshan.backend.inventory.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record InventoryUpdateRequest(
    @NotNull(message = "quantity is required") BigDecimal quantity,
    BigDecimal lowStockThreshold
) {}
