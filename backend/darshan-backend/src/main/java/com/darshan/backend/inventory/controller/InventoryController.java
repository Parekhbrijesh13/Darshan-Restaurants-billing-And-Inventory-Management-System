package com.darshan.backend.inventory.controller;

import com.darshan.backend.inventory.dto.InventoryResponse;
import com.darshan.backend.inventory.dto.InventoryUpdateRequest;
import com.darshan.backend.inventory.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

  private final InventoryService inventoryService;

  public InventoryController(InventoryService inventoryService) {
    this.inventoryService = inventoryService;
  }

  @GetMapping
  public List<InventoryResponse> listAll() {
    return inventoryService.listAll();
  }

  @GetMapping("/low-stock")
  public List<InventoryResponse> lowStock() {
    return inventoryService.lowStock();
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PutMapping("/{productId}")
  public InventoryResponse update(@PathVariable Long productId, @Valid @RequestBody InventoryUpdateRequest req) {
    return inventoryService.update(productId, req);
  }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long productId) {
        inventoryService.delete(productId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create")
    public ResponseEntity<InventoryResponse> create(
            @RequestParam Long productId,
            @Valid @RequestBody InventoryUpdateRequest req
    ) {
        InventoryResponse response = inventoryService.create(productId, req);
        return ResponseEntity.ok(response);
    }

}
