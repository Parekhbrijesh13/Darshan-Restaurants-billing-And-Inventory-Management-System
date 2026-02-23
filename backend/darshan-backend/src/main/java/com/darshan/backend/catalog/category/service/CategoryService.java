package com.darshan.backend.catalog.category.service;

import com.darshan.backend.catalog.category.dto.CategoryRequest;
import com.darshan.backend.catalog.category.dto.CategoryResponse;
import com.darshan.backend.catalog.category.entity.Category;
import com.darshan.backend.catalog.category.repo.CategoryRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> list() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryResponse(
                        c.getId(),
                        c.getName(),
                        c.isActive()
                ))
                .toList();
    }

    // ✅ ADD THIS METHOD
    public CategoryResponse create(CategoryRequest request) {

        Category category = Category.builder()
                .name(request.getName())
                .active(true)
                .createdAt(Instant.now())
                .build();

        Category saved = categoryRepository.save(category);

        return new CategoryResponse(
                saved.getId(),
                saved.getName(),
                saved.isActive()
        );
    }
}