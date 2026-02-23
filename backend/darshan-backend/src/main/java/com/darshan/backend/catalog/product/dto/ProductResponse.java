package com.darshan.backend.catalog.product.dto;

import java.math.BigDecimal;

public record ProductResponse(
    Long id,
    Long categoryId,
    String categoryName,
    String sku,
    String name,
    String description,
    BigDecimal price,
    String imageEmoji,
    boolean active
) {}
