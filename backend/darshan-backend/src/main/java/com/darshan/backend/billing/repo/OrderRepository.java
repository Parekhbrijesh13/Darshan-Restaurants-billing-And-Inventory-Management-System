package com.darshan.backend.billing.repo;

import com.darshan.backend.billing.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByCreatedAtBetweenOrderByCreatedAtDesc(Instant from, Instant to);
}
