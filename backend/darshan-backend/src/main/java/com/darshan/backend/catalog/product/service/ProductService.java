package com.darshan.backend.catalog.product.service;

import com.darshan.backend.catalog.category.repo.CategoryRepository;
import com.darshan.backend.catalog.product.dto.PosProductResponse;
import com.darshan.backend.catalog.product.dto.ProductCreateUpdateRequest;
import com.darshan.backend.catalog.product.dto.ProductResponse;
import com.darshan.backend.catalog.product.entity.Product;
import com.darshan.backend.catalog.product.repo.ProductRepository;
import com.darshan.backend.common.exception.ResourceNotFoundException;
import com.darshan.backend.inventory.entity.Inventory;
import com.darshan.backend.inventory.repo.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final InventoryRepository inventoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          InventoryRepository inventoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public List<ProductResponse> listAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ✅ FIXED METHOD
    public List<PosProductResponse> listForPos() {
        return productRepository.findActiveProductsWithCategory()
                .stream()
                .map(p -> new PosProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getPrice(),
                        p.getCategory().getName(),
                        p.getImageEmoji()
                ))
                .toList();
    }

    public ProductResponse create(ProductCreateUpdateRequest req) {
        var category = categoryRepository.findById(req.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product p = Product.builder()
                .category(category)
                .sku(req.sku())
                .name(req.name())
                .description(req.description())
                .price(req.price())
                .imageEmoji(req.imageEmoji())
                .active(req.active() == null || req.active())
                .build();

        p = productRepository.save(p);

        Inventory inv = Inventory.builder()
                .product(p)
                .build();

        inventoryRepository.save(inv);

        return toResponse(p);
    }

    public ProductResponse update(Long id, ProductCreateUpdateRequest req) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        var category = categoryRepository.findById(req.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        p.setCategory(category);
        p.setSku(req.sku());
        p.setName(req.name());
        p.setDescription(req.description());
        p.setPrice(req.price());
        p.setImageEmoji(req.imageEmoji());

        if (req.active() != null) {
            p.setActive(req.active());
        }

        p = productRepository.save(p);

        return toResponse(p);
    }

    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductResponse toResponse(Product p) {
        return new ProductResponse(
                p.getId(),
                p.getCategory().getId(),
                p.getCategory().getName(),
                p.getSku(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getImageEmoji(),
                p.isActive()
        );
    }
}
