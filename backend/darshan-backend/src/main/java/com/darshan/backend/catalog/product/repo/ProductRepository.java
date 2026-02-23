package com.darshan.backend.catalog.product.repo;

import com.darshan.backend.catalog.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByActiveTrue();

    @Query("""
      SELECT p FROM Product p
      JOIN FETCH p.category
      WHERE p.active = true
  """)
    List<Product> findActiveProductsWithCategory();
}
