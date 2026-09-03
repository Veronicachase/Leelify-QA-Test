package com.leelify.dao;

import com.leelify.exceptions.ContentProgressDataAccessException;
import com.leelify.model.ContentProgress;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Optional;

@Repository
public class ContentProgressDAO {
    private static final String SELECT_COLUMNS = """
            SELECT progress_id, user_id, content_id, progress_seconds, completed, updated_at
            FROM content_progress
            """;

    private final DataSource dataSource;

    public ContentProgressDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<ContentProgress> findByUserIdAndContentId(int userId, int contentId) {
        String sql = SELECT_COLUMNS + " WHERE user_id = ? AND content_id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.setInt(2, contentId);
            try (ResultSet resultSet = statement.executeQuery()) {
                return resultSet.next() ? Optional.of(mapProgress(resultSet)) : Optional.empty();
            }
        } catch (SQLException exception) {
            throw new ContentProgressDataAccessException("No se pudo obtener el progreso", exception);
        }
    }

    public ContentProgress save(int userId, int contentId, int progressSeconds, boolean completed) {
        String sql = """
                INSERT INTO content_progress (user_id, content_id, progress_seconds, completed)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    progress_seconds = VALUES(progress_seconds),
                    completed = VALUES(completed)
                """;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.setInt(2, contentId);
            statement.setInt(3, progressSeconds);
            statement.setBoolean(4, completed);
            statement.executeUpdate();
        } catch (SQLException exception) {
            throw new ContentProgressDataAccessException("No se pudo guardar el progreso", exception);
        }
        return findByUserIdAndContentId(userId, contentId)
                .orElseThrow(() -> new ContentProgressDataAccessException(
                        "El progreso se guardó, pero no pudo recuperarse"));
    }

    private ContentProgress mapProgress(ResultSet resultSet) throws SQLException {
        ContentProgress progress = new ContentProgress();
        progress.setProgressId(resultSet.getInt("progress_id"));
        progress.setUserId(resultSet.getInt("user_id"));
        progress.setContentId(resultSet.getInt("content_id"));
        progress.setProgressSeconds(resultSet.getInt("progress_seconds"));
        progress.setCompleted(resultSet.getBoolean("completed"));
        Timestamp updatedAt = resultSet.getTimestamp("updated_at");
        progress.setUpdatedAt(updatedAt == null ? null : updatedAt.toLocalDateTime());
        return progress;
    }
}
