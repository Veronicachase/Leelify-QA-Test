package com.leelify.dao;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


@Repository 
public class ContentLikeDAO {
    private final DataSource dataSource;
    public ContentLikeDAO(DataSource dataSource){
        this.dataSource= dataSource;
    }

    public boolean exists(int userId, int contentId) {
    String sql = """
        SELECT 1
        FROM content_likes
        WHERE user_id = ? AND content_id = ?
        """;

    try (
        Connection connection = dataSource.getConnection();
        PreparedStatement statement = connection.prepareStatement(sql)
    ) {
        statement.setInt(1, userId);
        statement.setInt(2, contentId);

        try (ResultSet result = statement.executeQuery()) {
            return result.next();
        }
    } catch (SQLException exception) {
        throw new IllegalStateException(
            "No se pudo consultar el like",
            exception
        );
    }
}

public void addLike(int userId,int contentId){
    String sql = """
            INSERT INTO content_likes(user_id, content_id) VALUES(?,?)
            ON DUPLICATE KEY UPDATE content_id = content_id
            """;
            try(Connection connection = dataSource.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)){
                statement.setInt(1, userId);
                statement.setInt(2, contentId);
                statement.executeUpdate();
            }catch(SQLException exception){
                throw new IllegalStateException("No se pudo guardar el like", exception);

            }
        
        
        
}

public void removeLike(int userId, int contentId){
String sql = """
        
DELETE FROM  content_likes
WHERE user_id = ? AND content_id=?
        """;
        try(
Connection connection = dataSource.getConnection();
PreparedStatement statement = connection.prepareStatement(sql)){
    statement.setInt(1, userId);
    statement.setInt(2, contentId);
    statement.executeUpdate();
}catch(SQLException exception){
    throw new IllegalStateException("NO se pudo quitar el like", exception);
}
}



    
}
