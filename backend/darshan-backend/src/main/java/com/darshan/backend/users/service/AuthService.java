package com.darshan.backend.users.service;

import com.darshan.backend.common.exception.BadRequestException;
import com.darshan.backend.security.JwtService;
import com.darshan.backend.users.dto.LoginRequest;
import com.darshan.backend.users.dto.LoginResponse;
import com.darshan.backend.users.dto.UserResponse;
import com.darshan.backend.users.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

    public LoginResponse login(LoginRequest req) {

        var user = userRepository.findByUsername(req.username())
                .orElseThrow(() -> new BadRequestException("User not found"));

        boolean matches = passwordEncoder.matches(req.password(), user.getPasswordHash());

        System.out.println("Entered password: " + req.password());
        System.out.println("Stored hash: " + user.getPasswordHash());
        System.out.println("Matches result: " + matches);
        System.out.println("User active: " + user.isActive());

        if (!user.isActive() || !matches) {
            throw new BadRequestException("Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());
        return new LoginResponse(token,
                new UserResponse(user.getId(), user.getUsername(), user.getFullName(), user.getRole().name()));
    }


}
