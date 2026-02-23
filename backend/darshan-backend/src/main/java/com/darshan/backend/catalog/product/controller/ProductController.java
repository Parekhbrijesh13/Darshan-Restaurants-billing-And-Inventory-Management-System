package com.darshan.backend.catalog.product.controller;

import com.darshan.backend.catalog.product.dto.PosProductResponse;
import com.darshan.backend.catalog.product.dto.ProductCreateUpdateRequest;
import com.darshan.backend.catalog.product.dto.ProductResponse;
import com.darshan.backend.catalog.product.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public List<ProductResponse> listAll() {
    return productService.listAll();
  }

  @GetMapping("/pos")
  public List<PosProductResponse> listForPos() {
    return productService.listForPos();
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping
  public ProductResponse create(@Valid @RequestBody ProductCreateUpdateRequest req) {
    return productService.create(req);
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PutMapping("/{id}")
  public ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductCreateUpdateRequest req) {
    return productService.update(id, req);
  }

  @PreAuthorize("hasRole('ADMIN')")
  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    productService.delete(id);
  }
}
