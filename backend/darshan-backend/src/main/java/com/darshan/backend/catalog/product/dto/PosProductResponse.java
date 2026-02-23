package com.darshan.backend.catalog.product.dto;

import java.math.BigDecimal;

public record PosProductResponse(
    Long id,
    String name,
    BigDecimal price,
    String category,
    String image
) {}
