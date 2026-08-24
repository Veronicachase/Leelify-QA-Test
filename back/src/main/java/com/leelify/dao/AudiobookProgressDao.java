package com.leelify.dao;

import com.leelify.exceptions.AudiobookProgressDataAccessException;
import com.leelify.model.AudiobookProgress;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AudiobookProgressDao {
    private static final String SELECT_COLUMNS = """
            SELECT progress_id, user_id, audio_id,
                   listened_seconds, completed, updated_at
            FROM audiobook_progress
            """;

    private final DataSource dataSource;

    public AudiobookProgressDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<AudiobookProgress> findByUserIdAndAudioId(int userId, int audioId) {
        String sql = SELECT_COLUMNS + " WHERE user_id = ? AND audio_id = ?";

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, userId);
            statement.setInt(2, audioId);

            try (ResultSet resultSet = statement.executeQuery()) {
                return resultSet.next()
                        ? Optional.of(mapAudiobookProgress(resultSet))
                        : Optional.empty();
            }
        } catch (SQLException exception) {
            throw new AudiobookProgressDataAccessException(
                    "No se pudo obtener el progreso del usuario " + userId
                            + " para el audiolibro " + audioId,
                    exception
            );
        }
    }

    public List<AudiobookProgress> findAllByUserId(int userId) {
        String sql = SELECT_COLUMNS + " WHERE user_id = ? ORDER BY updated_at DESC";
        List<AudiobookProgress> progressList = new ArrayList<>();

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, userId);

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    progressList.add(mapAudiobookProgress(resultSet));
                }
            }

            return progressList;
        } catch (SQLException exception) {
            throw new AudiobookProgressDataAccessException(
                    "No se pudieron obtener los progresos del usuario " + userId,
                    exception
            );
        }
    }

    public AudiobookProgress save(
            int userId,
            int audioId,
            int listenedSeconds,
            boolean completed
    ) {
        String sql = """
                INSERT INTO audiobook_progress (
                    user_id, audio_id, listened_seconds, completed
                ) VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    listened_seconds = VALUES(listened_seconds),
                    completed = VALUES(completed)
                """;

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, userId);
            statement.setInt(2, audioId);
            statement.setInt(3, listenedSeconds);
            statement.setBoolean(4, completed);
            statement.executeUpdate();
        } catch (SQLException exception) {
            throw new AudiobookProgressDataAccessException(
                    "No se pudo guardar el progreso del usuario " + userId
                            + " para el audiolibro " + audioId,
                    exception
            );
        }

        return findByUserIdAndAudioId(userId, audioId)
                .orElseThrow(() -> new AudiobookProgressDataAccessException(
                        "El progreso se guardó, pero no se pudo recuperar"
                       
                ));
    }

    private AudiobookProgress mapAudiobookProgress(ResultSet resultSet) throws SQLException {
        AudiobookProgress progress = new AudiobookProgress();
        progress.setProgressId(resultSet.getInt("progress_id"));
        progress.setUserId(resultSet.getInt("user_id"));
        progress.setAudioId(resultSet.getInt("audio_id"));
        progress.setListenedSeconds(resultSet.getInt("listened_seconds"));
        progress.setCompleted(resultSet.getBoolean("completed"));
        progress.setUpdatedAt(resultSet.getTimestamp("updated_at").toLocalDateTime());
        return progress;
    }
}
