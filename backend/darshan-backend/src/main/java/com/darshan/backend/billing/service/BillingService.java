package com.darshan.backend.billing.service;

import com.darshan.backend.billing.dto.CheckoutRequest;
import com.darshan.backend.billing.dto.CheckoutResponse;
import com.darshan.backend.billing.dto.OrderSummaryResponse;
import com.darshan.backend.billing.entity.Order;
import com.darshan.backend.billing.entity.OrderItem;
import com.darshan.backend.billing.entity.Payment;
import com.darshan.backend.billing.repo.OrderRepository;
import com.darshan.backend.billing.repo.PaymentRepository;
import com.darshan.backend.catalog.product.repo.ProductRepository;
import com.darshan.backend.common.exception.InsufficientStockException;
import com.darshan.backend.common.exception.ResourceNotFoundException;
import com.darshan.backend.inventory.entity.StockMovement;
import com.darshan.backend.inventory.repo.InventoryRepository;
import com.darshan.backend.inventory.repo.StockMovementRepository;
import com.darshan.backend.users.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class BillingService {

  private final OrderRepository orderRepository;
  private final PaymentRepository paymentRepository;
  private final ProductRepository productRepository;
  private final InventoryRepository inventoryRepository;
  private final StockMovementRepository stockMovementRepository;
  private final UserRepository userRepository;

  public BillingService(
      OrderRepository orderRepository,
      PaymentRepository paymentRepository,
      ProductRepository productRepository,
      InventoryRepository inventoryRepository,
      StockMovementRepository stockMovementRepository,
      UserRepository userRepository
  ) {
    this.orderRepository = orderRepository;
    this.paymentRepository = paymentRepository;
    this.productRepository = productRepository;
    this.inventoryRepository = inventoryRepository;
    this.stockMovementRepository = stockMovementRepository;
    this.userRepository = userRepository;
  }

  @Transactional
  public CheckoutResponse checkout(CheckoutRequest req, String username) {

    var createdBy = userRepository.findByUsername(username).orElse(null);

    Order order = new Order();
    order.setBillNo(nextBillNo());
    order.setCustomerName(req.customerName());
    order.setStatus(Order.Status.PAID);
    order.setGstRate(req.gstRate());
    order.setCreatedBy(createdBy);

    BigDecimal subtotal = BigDecimal.ZERO;

    for (var itemReq : req.items()) {
      var product = productRepository.findById(itemReq.productId())
          .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + itemReq.productId()));

      var inv = inventoryRepository.findByProductId(product.getId())
          .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product: " + product.getId()));

      if (inv.getQuantity().compareTo(itemReq.quantity()) < 0) {
        throw new InsufficientStockException("Insufficient stock for " + product.getName());
      }

      BigDecimal lineTotal = product.getPrice().multiply(itemReq.quantity()).setScale(2, RoundingMode.HALF_UP);
      subtotal = subtotal.add(lineTotal);

      OrderItem oi = OrderItem.builder()
          .order(order)
          .product(product)
          .productNameSnapshot(product.getName())
          .unitPrice(product.getPrice())
          .quantity(itemReq.quantity())
          .lineTotal(lineTotal)
          .build();

      order.getItems().add(oi);

      // update stock
      inv.setQuantity(inv.getQuantity().subtract(itemReq.quantity()));
      inventoryRepository.save(inv);

      stockMovementRepository.save(StockMovement.builder()
          .product(product)
          .movementType(StockMovement.MovementType.OUT)
          .quantity(itemReq.quantity())
          .reason("SALE")
          .referenceOrderId(null)
          .build());
    }

    BigDecimal gstAmount = subtotal.multiply(req.gstRate()).setScale(2, RoundingMode.HALF_UP);
    BigDecimal total = subtotal.add(gstAmount).setScale(2, RoundingMode.HALF_UP);

    order.setSubtotal(subtotal.setScale(2, RoundingMode.HALF_UP));
    order.setGstAmount(gstAmount);
    order.setTotalAmount(total);

    order = orderRepository.save(order);

    if (req.payment() != null) {
      Payment.Method m = Payment.Method.valueOf(req.payment().method().toUpperCase());
      Payment payment = Payment.builder()
          .order(order)
          .method(m)
          .amount(req.payment().amount())
          .txnRef(req.payment().txnRef())
          .build();
      paymentRepository.save(payment);
    }

    return new CheckoutResponse(order.getId(), order.getBillNo(), order.getStatus().name(), order.getSubtotal(), order.getGstAmount(), order.getTotalAmount(), order.getCreatedAt());
  }

  public List<OrderSummaryResponse> history(LocalDate from, LocalDate to) {
    Instant start = from.atStartOfDay().toInstant(ZoneOffset.UTC);
    Instant end = to.plusDays(1).atStartOfDay().toInstant(ZoneOffset.UTC);
    return orderRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(start, end).stream()
        .map(o -> new OrderSummaryResponse(o.getId(), o.getBillNo(), o.getCustomerName(), o.getStatus().name(), o.getTotalAmount(), o.getCreatedAt()))
        .toList();
  }

  private String nextBillNo() {
    // simple bill number: DR-YYYYMMDD-<epoch-last4>
    String date = LocalDate.now(ZoneOffset.UTC).format(DateTimeFormatter.BASIC_ISO_DATE);
    String suffix = String.valueOf(System.currentTimeMillis() % 10000).formatted("%04d", System.currentTimeMillis() % 10000);
    return "DR-" + date + "-" + suffix;
  }
}
