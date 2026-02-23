package com.darshan.backend.users.dto;

public record LoginResponse(
    String token,
    UserResponse user
) {}
