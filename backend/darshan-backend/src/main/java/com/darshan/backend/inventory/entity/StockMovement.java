package com.darshan.backend.inventory.entity;

import com.darshan.backend.catalog.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "stock_movements")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class StockMovement {

  public enum MovementType { IN, OUT, ADJUSTMENT }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  private Product product;

  @Enumerated(EnumType.STRING)
  @Column(name = "movement_type", nullable = false)
  private MovementType movementType;

  @Column(nullable = false, precision = 12, scale = 3)
  private BigDecimal quantity;

  @Column(length = 120)
  private String reason;

  @Column(name = "reference_order_id")
  private Long referenceOrderId;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt = Instant.now();
}
