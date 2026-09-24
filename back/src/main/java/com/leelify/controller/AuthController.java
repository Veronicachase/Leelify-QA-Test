package com.leelify.controller;

import com.leelify.dto.LoginRequest;
import com.leelify.dto.RegisterRequest;
import com.leelify.dto.AuthResponse;
import com.leelify.service.AuthService;
import com.leelify.service.RefreshSessionService;
import com.leelify.service.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestHeader;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final RefreshSessionService sessions;
    private final boolean secureCookie;
    private static final String COOKIE_NAME = "leelify_refresh";

    public AuthController(AuthService authService, RefreshSessionService sessions,
            @Value("${app.auth.cookie-secure:false}") boolean secureCookie) {
        this.authService = authService;
        this.sessions = sessions;
        this.secureCookie = secureCookie;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request,
            @RequestHeader("X-Leelify-Request") String browserRequest,
            @CookieValue(name = COOKIE_NAME, required = false) String previousToken) {
        AuthResponse response = authService.login(request);
        String token = sessions.create(response.user().userId());
        sessions.revoke(previousToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.CACHE_CONTROL, "no-store")
                .header(HttpHeaders.SET_COOKIE, cookie(token, sessions.getLifetimeSeconds()).toString())
                .body(response);
    }

    // The required custom header plus the explicit CORS origin allowlist prevents
    // cross-origin forms from exercising cookie-authenticated endpoints (CSRF).
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @RequestHeader("X-Leelify-Request") String browserRequest,
            @CookieValue(name = COOKIE_NAME, required = false) String token) {
        try {
            AuthResponse response = authService.refresh(sessions.authenticate(token));
            return ResponseEntity.ok().header(HttpHeaders.CACHE_CONTROL, "no-store").body(response);
        } catch (InvalidCredentialsException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .header(HttpHeaders.CACHE_CONTROL, "no-store")
                    .header(HttpHeaders.SET_COOKIE, cookie("", 0).toString()).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader("X-Leelify-Request") String browserRequest,
            @CookieValue(name = COOKIE_NAME, required = false) String token) {
        sessions.revoke(token);
        return ResponseEntity.noContent()
                .header(HttpHeaders.CACHE_CONTROL, "no-store")
                .header(HttpHeaders.SET_COOKIE, cookie("", 0).toString()).build();
    }

    private ResponseCookie cookie(String value, long maxAge) {
        return ResponseCookie.from(COOKIE_NAME, value)
                .httpOnly(true).secure(secureCookie).sameSite("Strict")
                .path("/api/auth").maxAge(maxAge).build();
    }
}
