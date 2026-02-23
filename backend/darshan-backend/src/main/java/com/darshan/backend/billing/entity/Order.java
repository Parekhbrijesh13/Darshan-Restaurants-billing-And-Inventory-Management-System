package com.darshan.backend.billing.entity;

import com.darshan.backend.users.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Order {

  public enum Status { DRAFT, PAID, CANCELLED }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "bill_no", nullable = false, unique = true, length = 30)
  private String billNo;

  @Column(name = "customer_name", length = 100)
  private String customerName;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Status status = Status.DRAFT;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal subtotal = BigDecimal.ZERO;

  @Column(name = "gst_rate", nullable = false, precision = 5, scale = 4)
  private BigDecimal gstRate = new BigDecimal("0.05");

  @Column(name = "gst_amount", nullable = false, precision = 10, scale = 2)
  private BigDecimal gstAmount = BigDecimal.ZERO;

  @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
  private BigDecimal totalAmount = BigDecimal.ZERO;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "created_by")
  private User createdBy;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt = Instant.now();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @Builder.Default
  private List<OrderItem> items = new ArrayList<>();
}
