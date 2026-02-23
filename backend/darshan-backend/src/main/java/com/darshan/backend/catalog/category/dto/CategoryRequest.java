package com.darshan.backend.catalog.category.dto;

import lombok.*;

@Getter @Setter
public class CategoryRequest {
    private String name;
    private Boolean active;
}