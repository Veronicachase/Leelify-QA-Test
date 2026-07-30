package com.leelify.dao;

import com.leelify.exceptions.AudiobookDataAccessException;
import com.leelify.model.Audiobook;
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
public class AudiobookDAO {
    private static final String SELECT_COLUMNS = """
            SELECT audio_id, title, duration_seconds, points, chapters,
                   author, image_url, audio_url, grade
            FROM audiobooks
            """;

    private final DataSource dataSource;

    public AudiobookDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Audiobook> getAllAudiobooks() {
        return findMany(SELECT_COLUMNS, null);
    }

    public List<Audiobook> getAudiobooksByGrade(int grade) {
        String sql = SELECT_COLUMNS + " WHERE grade = ?";
        return findMany(sql, grade);
    }

    public Optional<Audiobook> getAudiobookById(int audioId) {
        String sql = SELECT_COLUMNS + " WHERE audio_id = ?";

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, audioId);

            try (ResultSet resultSet = statement.executeQuery()) {
                return resultSet.next()
                        ? Optional.of(mapAudiobook(resultSet))
                        : Optional.empty();
            }
        } catch (SQLException exception) {
            throw new AudiobookDataAccessException(
                    "No se pudo buscar el audiolibro " + audioId,
                    exception
            );
        }
    }

    private List<Audiobook> findMany(String sql, Integer grade) {
        List<Audiobook> audiobooks = new ArrayList<>();

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            if (grade != null) {
                statement.setInt(1, grade);
            }

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    audiobooks.add(mapAudiobook(resultSet));
                }
            }

            return audiobooks;
        } catch (SQLException exception) {
            throw new AudiobookDataAccessException(
                    "No se pudieron obtener los audiolibros",
                    exception
            );
        }
    }

    private Audiobook mapAudiobook(ResultSet resultSet) throws SQLException {
        Audiobook audiobook = new Audiobook();
        audiobook.setAudioId(resultSet.getInt("audio_id"));
        audiobook.setTitle(resultSet.getString("title"));
        audiobook.setDurationSeconds(resultSet.getInt("duration_seconds"));
        audiobook.setPoints(resultSet.getInt("points"));
        audiobook.setChapters(resultSet.getInt("chapters"));
        audiobook.setAuthor(resultSet.getString("author"));
        audiobook.setImageUrl(resultSet.getString("image_url"));
        audiobook.setAudioUrl(resultSet.getString("audio_url"));
        audiobook.setGrade(resultSet.getInt("grade"));
        return audiobook;
    }
}
