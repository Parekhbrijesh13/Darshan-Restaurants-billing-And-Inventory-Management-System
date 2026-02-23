package com.darshan.backend.billing.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public record CheckoutRequest(
    String customerName,
    @NotNull(message = "gstRate is required") @DecimalMin(value = "0.0") BigDecimal gstRate,
    @NotEmpty(message = "items cannot be empty") List<@Valid CheckoutItem> items,
    @Valid PaymentDto payment
) {
  public record CheckoutItem(
      @NotNull(message = "productId is required") Long productId,
      @NotNull(message = "quantity is required") @DecimalMin(value = "0.001") BigDecimal quantity
  ) {}

  public record PaymentDto(
      @NotNull(message = "method is required") String method,
      @NotNull(message = "amount is required") @DecimalMin(value = "0.0") BigDecimal amount,
      String txnRef
  ) {}
}
