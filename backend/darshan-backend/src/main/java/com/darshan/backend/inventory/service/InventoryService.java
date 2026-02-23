package com.darshan.backend.inventory.service;

import com.darshan.backend.common.exception.ResourceNotFoundException;
import com.darshan.backend.inventory.dto.InventoryResponse;
import com.darshan.backend.inventory.dto.InventoryUpdateRequest;
import com.darshan.backend.inventory.repo.InventoryRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.darshan.backend.catalog.product.entity.Product;
import com.darshan.backend.catalog.product.repo.ProductRepository;
import com.darshan.backend.inventory.entity.Inventory;
import java.time.Instant;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;

    public InventoryService(InventoryRepository inventoryRepository,
                            ProductRepository productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
    }
    @Transactional(readOnly = true)
    public List<InventoryResponse> listAll() {
        return inventoryRepository.findAll().stream().map(inv ->
                new InventoryResponse(
                        inv.getProduct().getId(),
                        inv.getProduct().getName(),
                        inv.getProduct().getCategory().getName(), // fetch category name
                        inv.getQuantity(),
                        inv.getLowStockThreshold(),
                        inv.getQuantity().compareTo(inv.getLowStockThreshold()) <= 0
                )
        ).toList();
    }

    @Transactional(readOnly = true)
    public List<InventoryResponse> lowStock() {
        return inventoryRepository.findAll().stream()
                .filter(inv -> inv.getQuantity().compareTo(inv.getLowStockThreshold()) <= 0)
                .map(inv -> new InventoryResponse(
                        inv.getProduct().getId(),
                        inv.getProduct().getName(),
                        inv.getProduct().getCategory().getName(), // fetch category name
                        inv.getQuantity(),
                        inv.getLowStockThreshold(),
                        true
                ))
                .toList();
    }

  @Transactional
  public InventoryResponse update(Long productId, InventoryUpdateRequest req) {
    var inv = inventoryRepository.findByProductId(productId)
        .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));

    inv.setQuantity(req.quantity());
    if (req.lowStockThreshold() != null) inv.setLowStockThreshold(req.lowStockThreshold());

    inv = inventoryRepository.save(inv);
    boolean low = inv.getQuantity().compareTo(inv.getLowStockThreshold()) <= 0;
    return new InventoryResponse(inv.getProduct().getId(), inv.getProduct().getName(), inv.getProduct().getCategory().getName(), inv.getQuantity(), inv.getLowStockThreshold(), low);
  }

    @Transactional
    public void delete(Long productId) {
        var inv = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));

        inventoryRepository.delete(inv);
    }

    @Transactional
    public InventoryResponse create(Long productId, InventoryUpdateRequest req) {

        if (inventoryRepository.findByProductId(productId).isPresent()) {
            throw new RuntimeException("Inventory already exists for this product");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Inventory inventory = Inventory.builder()
                .product(product)
                .quantity(req.quantity())
                .lowStockThreshold(
                        req.lowStockThreshold() != null
                                ? req.lowStockThreshold()
                                : new java.math.BigDecimal("5")
                )
                .lastRestockedAt(java.time.Instant.now())
                .build();

        inventoryRepository.save(inventory);

        boolean low = inventory.getQuantity()
                .compareTo(inventory.getLowStockThreshold()) <= 0;

        return new InventoryResponse(
                product.getId(),
                product.getName(),
                product.getCategory().getName(),
                inventory.getQuantity(),
                inventory.getLowStockThreshold(),
                low
        );
    }
}
