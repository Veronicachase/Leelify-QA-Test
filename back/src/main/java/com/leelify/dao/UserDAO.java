package com.leelify.dao;

import com.leelify.model.User;
import com.leelify.exceptions.DuplicateEmailException;
import com.leelify.exceptions.UserDataAccessException;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;

@Repository
public class UserDAO {
    private final DataSource dataSource;

    public UserDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public boolean insertUser(User user) {
        String sql = """
                INSERT INTO users (name, email, password, role, grade)
                VALUES (?, ?, ?, ?, ?)
                """;

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getPasswordHash());
            statement.setString(4, user.getRole());
            statement.setInt(5, user.getGrade());
            return statement.executeUpdate() > 0;
        } catch (SQLIntegrityConstraintViolationException exception) {
            throw new DuplicateEmailException(user.getEmail(), exception);
        } catch (SQLException exception) {
            throw new UserDataAccessException("No se pudo insertar el usuario", exception);
        }
    }

    public Optional<User> getUserByEmail(String email) {
        String sql = """
                SELECT user_id, name, email, password, role, grade
                FROM users
                WHERE email = ?
                """;

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setString(1, email);

            try (ResultSet resultSet = statement.executeQuery()) {
                return resultSet.next()
                        ? Optional.of(mapUser(resultSet))
                        : Optional.empty();
            }
        } catch (SQLException exception) {
            throw new UserDataAccessException("No se pudo buscar el usuario", exception);
        }
    }

    public boolean updateUser(User user) {
        String sql = """
                UPDATE users
                SET name = ?, email = ?, password = ?, role = ?, grade = ?
                WHERE user_id = ?
                """;

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getPasswordHash());
            statement.setString(4, user.getRole());
            statement.setInt(5, user.getGrade());
            statement.setInt(6, user.getUserId());
            return statement.executeUpdate() > 0;
        } catch (SQLException exception) {
            throw new UserDataAccessException("No se pudo actualizar el usuario", exception);
        }
    }

    public boolean deleteUser(int userId) {
        String sql = "DELETE FROM users WHERE user_id = ?";

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, userId);
            return statement.executeUpdate() > 0;
        } catch (SQLException exception) {
            throw new UserDataAccessException("No se pudo eliminar el usuario", exception);
        }
    }

    public boolean updatePassword(String email, String newPasswordHash) {
        String sql = "UPDATE users SET password = ? WHERE email = ?";

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setString(1, newPasswordHash);
            statement.setString(2, email);
            return statement.executeUpdate() > 0;
        } catch (SQLException exception) {
            throw new UserDataAccessException("No se pudo actualizar la contraseña", exception);
        }
    }

    private User mapUser(ResultSet resultSet) throws SQLException {
        User user = new User();
        user.setUserId(resultSet.getInt("user_id"));
        user.setName(resultSet.getString("name"));
        user.setEmail(resultSet.getString("email"));
        user.setPasswordHash(resultSet.getString("password"));
        user.setRole(resultSet.getString("role"));
        user.setGrade(resultSet.getInt("grade"));
        return user;
    }
}
