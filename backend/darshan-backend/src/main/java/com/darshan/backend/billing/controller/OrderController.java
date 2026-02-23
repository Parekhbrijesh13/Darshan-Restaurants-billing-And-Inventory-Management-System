package com.darshan.backend.billing.controller;

import com.darshan.backend.billing.dto.CheckoutRequest;
import com.darshan.backend.billing.dto.CheckoutResponse;
import com.darshan.backend.billing.dto.OrderSummaryResponse;
import com.darshan.backend.billing.service.BillingService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

  private final BillingService billingService;

  public OrderController(BillingService billingService) {
    this.billingService = billingService;
  }

    @PostMapping("/checkout")
    public CheckoutResponse checkout(
            @Valid @RequestBody CheckoutRequest req,
            Authentication auth) {

        String username = "Walk-in Customer";   // default name

        if (auth != null &&
                auth.isAuthenticated() &&
                !"anonymousUser".equals(auth.getPrincipal())) {

            username = auth.getName();
        }

        return billingService.checkout(req, username);
    }

  @GetMapping
  public List<OrderSummaryResponse> history(@RequestParam LocalDate from, @RequestParam LocalDate to) {
    return billingService.history(from, to);
  }
}
