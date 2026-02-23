package com.darshan.backend.users.controller;

import com.darshan.backend.users.dto.LoginRequest;
import com.darshan.backend.users.dto.LoginResponse;
import com.darshan.backend.users.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public LoginResponse login(@Valid @RequestBody LoginRequest req) {
    return authService.login(req);
  }
}
