package com.leelify.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class RefreshSessionService {
    private final JdbcTemplate jdbc;
    private final long lifetimeSeconds;
    private final SecureRandom random = new SecureRandom();

    public RefreshSessionService(JdbcTemplate jdbc,
            @Value("${app.auth.refresh-seconds:604800}") long lifetimeSeconds) {
        this.jdbc = jdbc;
        this.lifetimeSeconds = lifetimeSeconds;
    }

    public String create(int userId) {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        jdbc.update("DELETE FROM refresh_sessions WHERE expires_at <= ?", Timestamp.from(Instant.now()));
        jdbc.update("INSERT INTO refresh_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
                hash(token), userId, Timestamp.from(Instant.now().plusSeconds(lifetimeSeconds)));
        return token;
    }

    public int authenticate(String token) {
        if (token == null || !token.matches("[A-Za-z0-9_-]{43}")) {
            throw new InvalidCredentialsException();
        }
        return jdbc.query("SELECT user_id FROM refresh_sessions WHERE token_hash = ? AND expires_at > ?",
                (rs, row) -> rs.getInt("user_id"), hash(token), Timestamp.from(Instant.now()))
                .stream().findFirst().orElseThrow(InvalidCredentialsException::new);
    }

    public void revoke(String token) {
        if (token != null) {
            jdbc.update("DELETE FROM refresh_sessions WHERE token_hash = ?", hash(token));
        }
    }

    public long getLifetimeSeconds() {
        return lifetimeSeconds;
    }

    private static String hash(String token) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                    .digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(exception);
        }
    }
}
