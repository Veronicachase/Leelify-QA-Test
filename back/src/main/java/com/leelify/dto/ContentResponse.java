package com.leelify.dto;

import com.leelify.model.Content;
import com.leelify.model.ContentType;
import java.time.LocalDateTime;

public record ContentResponse(
        int contentId,
        ContentType contentType,
        String title,
        String description,
        String category,
        int durationSeconds,
        int points,
        int chapters,
        String author,
        String thumbnailUrl,
        String mediaUrl,
        int grade,
        LocalDateTime createdAt,
        boolean featured,
        int playCount
) {
   public static ContentResponse from(Content content) {
    return new ContentResponse(
            content.getContentId(),
            content.getContentType(),
            content.getTitle(),
            content.getDescription(),
            content.getCategory(),
            content.getDurationSeconds(),
            content.getPoints(),
            content.getChapters(),
            content.getAuthor(),
            content.getThumbnailUrl(),
            content.getMediaUrl(),
            content.getGrade(),
            content.getCreatedAt(),
            content.isFeatured(),
            content.getPlayCount()
    );
}
}
