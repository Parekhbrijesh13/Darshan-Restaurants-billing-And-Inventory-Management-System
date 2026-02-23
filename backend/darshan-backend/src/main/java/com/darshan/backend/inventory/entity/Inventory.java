package com.darshan.backend.inventory.entity;

import com.darshan.backend.catalog.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "inventory")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Inventory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", unique = true)
  private Product product;

  @Column(nullable = false, precision = 12, scale = 3)
  private BigDecimal quantity = BigDecimal.ZERO;

  @Column(name = "low_stock_threshold", nullable = false, precision = 12, scale = 3)
  private BigDecimal lowStockThreshold = new BigDecimal("5");

  @Column(name = "last_restocked_at")
  private Instant lastRestockedAt;
}
