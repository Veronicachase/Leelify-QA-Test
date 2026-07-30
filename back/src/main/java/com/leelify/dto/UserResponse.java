package com.leelify.dto;

import com.leelify.model.User;

public record UserResponse(
        int userId,
        String name,
        String email,
        String role,
        int grade
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getGrade()
        );
    }
}
