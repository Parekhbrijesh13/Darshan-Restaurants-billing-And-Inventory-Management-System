package com.darshan.backend.catalog.product.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ProductCreateUpdateRequest(
    @NotNull(message = "categoryId is required") Long categoryId,
    @NotBlank(message = "name is required") String name,
    @NotNull(message = "price is required") @DecimalMin(value = "0.0", inclusive = false, message = "price must be > 0") BigDecimal price,
    String sku,
    String description,
    String imageEmoji,
    Boolean active
) {}
