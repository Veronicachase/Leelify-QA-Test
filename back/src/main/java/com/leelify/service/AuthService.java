package com.leelify.service;

import com.leelify.exceptions.DuplicateEmailException;
import com.leelify.dao.UserDAO;
import com.leelify.dto.LoginRequest;
import com.leelify.dto.RegisterRequest;
import com.leelify.dto.UserResponse;
import com.leelify.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.leelify.dto.AuthResponse;

@Service
public class AuthService {
    private static final String DEFAULT_ROLE = "STUDENT";

    private final UserDAO userDAO;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserDAO userDAO, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = normalizeEmail(request.email());

        if (userDAO.getUserByEmail(normalizedEmail).isPresent()) {
            throw new DuplicateEmailException(normalizedEmail, null);
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(normalizedEmail);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(DEFAULT_ROLE);
        user.setGrade(request.grade());

        userDAO.insertUser(user);

        User savedUser = userDAO.getUserByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalStateException("El usuario se guardó, pero no pudo recuperarse"));

        return createAuthResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userDAO.getUserByEmail(normalizeEmail(request.email()))
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }

        return createAuthResponse(user);
    }
    private AuthResponse createAuthResponse(User user) {
    String token = jwtService.generateToken(user);

        return new AuthResponse(
            token,
            "Bearer",
            jwtService.getExpirationSeconds(),
            UserResponse.from(user)
        );
}

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }
}
