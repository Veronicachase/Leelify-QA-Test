package com.leelify.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.core.io.ClassPathResource;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;

class RefreshSessionServiceTest {
    private JdbcTemplate jdbc;
    private RefreshSessionService sessions;

    @BeforeEach
    void setUp() {
        var dataSource = new DriverManagerDataSource(
                "jdbc:h2:mem:" + UUID.randomUUID() + ";MODE=MySQL;DB_CLOSE_DELAY=-1", "sa", "");
        var schema = new ResourceDatabasePopulator(new ClassPathResource("refresh-sessions.sql"));
        schema.execute(dataSource);
        schema.execute(dataSource); // Startup must be safe with an existing table.
        jdbc = new JdbcTemplate(dataSource);
        sessions = new RefreshSessionService(jdbc, 604800);
    }

    @Test
    void restoresSessionAcrossServiceInstancesWithoutStoringRawToken() {
        String token = sessions.create(42);
        String stored = jdbc.queryForObject("SELECT token_hash FROM refresh_sessions", String.class);
        assertNotEquals(token, stored);
        assertEquals(64, stored.length());
        assertEquals(42, new RefreshSessionService(jdbc, 604800).authenticate(token));
    }

    @Test
    void logoutRevokesOnlyTheSelectedSession() {
        String first = sessions.create(42);
        String second = sessions.create(42);
        sessions.revoke(first);
        assertThrows(InvalidCredentialsException.class, () -> sessions.authenticate(first));
        assertEquals(42, sessions.authenticate(second));
    }

    @Test
    void rejectsExpiredMissingMalformedAndUnknownTokens() {
        String expired = new RefreshSessionService(jdbc, -1).create(42);
        assertThrows(InvalidCredentialsException.class, () -> sessions.authenticate(expired));
        assertThrows(InvalidCredentialsException.class, () -> sessions.authenticate(null));
        assertThrows(InvalidCredentialsException.class, () -> sessions.authenticate("bad-token"));
        assertThrows(InvalidCredentialsException.class, () -> sessions.authenticate("a".repeat(43)));
    }
}
