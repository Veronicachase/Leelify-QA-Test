package com.leelify.dto;

import java.time.LocalDateTime;

public record ContentProgressResponse(
        Integer progressId,
        int userId,
        int contentId,
        int progressSeconds,
        boolean completed,
        LocalDateTime updatedAt
) {
}
