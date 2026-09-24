package com.leelify.controller;

import com.leelify.dto.AuthResponse;
import com.leelify.dto.UserResponse;
import com.leelify.service.AuthService;
import com.leelify.service.RefreshSessionService;
import com.leelify.service.InvalidCredentialsException;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.containsString;

class AuthControllerTest {
    private AuthService auth;
    private RefreshSessionService sessions;
    private MockMvc mvc;
    private final AuthResponse response = new AuthResponse("access-token", "Bearer", 3600,
            new UserResponse(42, "Test", "test@example.com", "STUDENT", 3));

    @BeforeEach
    void setUp() {
        auth = mock(AuthService.class);
        sessions = mock(RefreshSessionService.class);
        mvc = MockMvcBuilders.standaloneSetup(new AuthController(auth, sessions, true)).build();
    }

    @Test
    void loginSetsProtectedCookieAndReplacesPreviousSession() throws Exception {
        when(auth.login(any())).thenReturn(response);
        when(sessions.create(42)).thenReturn("refresh-token");
        when(sessions.getLifetimeSeconds()).thenReturn(604800L);
        mvc.perform(post("/api/auth/login").header("X-Leelify-Request", "true")
                .cookie(new Cookie("leelify_refresh", "old-token"))
                .contentType("application/json")
                .content("{\"email\":\"test@example.com\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(header().string("Cache-Control", "no-store"))
                .andExpect(header().string("Set-Cookie", containsString("HttpOnly")))
                .andExpect(header().string("Set-Cookie", containsString("Secure")))
                .andExpect(header().string("Set-Cookie", containsString("SameSite=Strict")))
                .andExpect(header().string("Set-Cookie", containsString("Path=/api/auth")))
                .andExpect(jsonPath("$.accessToken").value("access-token"));
        verify(sessions).revoke("old-token");
    }

    @Test
    void refreshReturnsUserAndNewAccessToken() throws Exception {
        when(sessions.authenticate("valid")).thenReturn(42);
        when(auth.refresh(42)).thenReturn(response);
        mvc.perform(post("/api/auth/refresh").header("X-Leelify-Request", "true")
                .cookie(new Cookie("leelify_refresh", "valid")))
                .andExpect(status().isOk()).andExpect(jsonPath("$.user.userId").value(42));
    }

    @Test
    void invalidSessionIsUnauthorizedAndClearsCookie() throws Exception {
        when(sessions.authenticate(null)).thenThrow(new InvalidCredentialsException());
        mvc.perform(post("/api/auth/refresh").header("X-Leelify-Request", "true"))
                .andExpect(status().isUnauthorized())
                .andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
    }

    @Test
    void cookieEndpointsRequireNonSimpleRequestHeader() throws Exception {
        mvc.perform(post("/api/auth/refresh")).andExpect(status().isBadRequest());
        mvc.perform(post("/api/auth/logout")).andExpect(status().isBadRequest());
        verifyNoInteractions(sessions);
    }

    @Test
    void logoutRevokesSessionAndClearsCookie() throws Exception {
        mvc.perform(post("/api/auth/logout").header("X-Leelify-Request", "true")
                .cookie(new Cookie("leelify_refresh", "valid")))
                .andExpect(status().isNoContent())
                .andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
        verify(sessions).revoke("valid");
    }
}
