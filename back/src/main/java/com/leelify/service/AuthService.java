package com.leelify.service;

import com.leelify.exceptions.DuplicateEmailException;
import com.leelify.dao.UserDAO;
import com.leelify.dto.LoginRequest;
import com.leelify.dto.RegisterRequest;
import com.leelify.dto.UserResponse;
import com.leelify.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private static final String DEFAULT_ROLE = "STUDENT";

    private final UserDAO userDAO;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(RegisterRequest request) {
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

        return UserResponse.from(savedUser);
    }

    public UserResponse login(LoginRequest request) {
        User user = userDAO.getUserByEmail(normalizeEmail(request.email()))
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }

        return UserResponse.from(user);
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }
}
