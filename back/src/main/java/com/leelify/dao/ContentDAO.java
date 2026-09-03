package com.leelify.dao;

import com.leelify.exceptions.ContentDataAccessException;
import com.leelify.model.Content;
import com.leelify.model.ContentType;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ContentDAO {
    private static final String SELECT_COLUMNS = """
            SELECT content_id, content_type, title, description, category,
                   duration_seconds, points, chapters, author, thumbnail_url,
                   media_url, grade, created_at, featured, play_count
            FROM contents
            """;

    private final DataSource dataSource;

    public ContentDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Content> getContents(Integer grade, ContentType type) {
        StringBuilder sql = new StringBuilder(SELECT_COLUMNS).append(" WHERE 1 = 1");
        List<Object> parameters = new ArrayList<>();
        if (grade != null) {
            sql.append(" AND grade = ?");
            parameters.add(grade);
        }
        if (type != null) {
            sql.append(" AND content_type = ?");
            parameters.add(type.name());
        }
        sql.append(" ORDER BY created_at DESC");
        return findMany(sql.toString(), parameters);
    }

    public Optional<Content> getContentById(int contentId) {
        String sql = SELECT_COLUMNS + " WHERE content_id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, contentId);
            try (ResultSet resultSet = statement.executeQuery()) {
                return resultSet.next() ? Optional.of(mapContent(resultSet)) : Optional.empty();
            }
        } catch (SQLException exception) {
            throw new ContentDataAccessException("No se pudo buscar el contenido " + contentId, exception);
        }
    }

    private List<Content> findMany(String sql, List<Object> parameters) {
        List<Content> contents = new ArrayList<>();
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            for (int index = 0; index < parameters.size(); index++) {
                statement.setObject(index + 1, parameters.get(index));
            }
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    contents.add(mapContent(resultSet));
                }
            }
            return contents;
        } catch (SQLException exception) {
            throw new ContentDataAccessException("No se pudieron obtener los contenidos", exception);
        }
    }
// Métodos para crear en el futuro:
    // getFeaturedContents()
   // searchContents(String text)

    private Content mapContent(ResultSet resultSet) throws SQLException {
        Content content = new Content();
        content.setContentId(resultSet.getInt("content_id"));
        content.setContentType(ContentType.valueOf(resultSet.getString("content_type")));
        content.setTitle(resultSet.getString("title"));
        content.setDescription(resultSet.getString("description"));
        content.setCategory(resultSet.getString("category"));
        content.setDurationSeconds(resultSet.getInt("duration_seconds"));
        content.setPoints(resultSet.getInt("points"));
        content.setChapters(resultSet.getInt("chapters"));
        content.setAuthor(resultSet.getString("author"));
        content.setThumbnailUrl(resultSet.getString("thumbnail_url"));
        content.setMediaUrl(resultSet.getString("media_url"));
        content.setGrade(resultSet.getInt("grade"));
        Timestamp createdAt = resultSet.getTimestamp("created_at");
        content.setCreatedAt(createdAt == null ? null : createdAt.toLocalDateTime());
        content.setFeatured(resultSet.getBoolean("featured"));
        content.setPlayCount(resultSet.getInt("play_count"));
        return content;
    }
}
