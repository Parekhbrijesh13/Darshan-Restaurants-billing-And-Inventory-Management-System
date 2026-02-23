package com.darshan.backend.users.dto;

public record UserResponse(
    Long id,
    String username,
    String fullName,
    String role
) {}
