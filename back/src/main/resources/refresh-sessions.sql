CREATE TABLE IF NOT EXISTS refresh_sessions (
    token_hash CHAR(64) PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    INDEX idx_refresh_sessions_expiry (expires_at)
);
