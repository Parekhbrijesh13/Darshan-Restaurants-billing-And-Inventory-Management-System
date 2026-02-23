package com.darshan.backend.catalog.category.controller;

import com.darshan.backend.catalog.category.dto.CategoryResponse;
import com.darshan.backend.catalog.category.service.CategoryService;
import org.springframework.web.bind.annotation.*;
import com.darshan.backend.catalog.category.dto.CategoryRequest;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping
  public List<CategoryResponse> list() {
    return categoryService.list();
  }

    @PostMapping
    public CategoryResponse create(@RequestBody CategoryRequest request) {
        return categoryService.create(request);
    }

}
