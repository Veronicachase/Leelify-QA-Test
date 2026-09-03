package com.leelify.service;
import com.leelify.dao.ContentDAO;
import com.leelify.dao.ContentProgressDAO;
import com.leelify.dto.ContentProgressRequest;
import com.leelify.dto.ContentProgressResponse;
import com.leelify.exceptions.ContentNotFoundException;
import com.leelify.model.Content;
import com.leelify.model.ContentProgress;
import org.springframework.stereotype.Service;
@Service
public class ContentProgressService {
    private final ContentProgressDAO progressDAO;
    private final ContentDAO contentDAO;
    public ContentProgressService(ContentProgressDAO progressDAO, ContentDAO contentDAO) {
        this.progressDAO = progressDAO; this.contentDAO = contentDAO;
    }
    public ContentProgressResponse getProgress(int userId, int contentId) {
        requireContent(contentId);
        return progressDAO.findByUserIdAndContentId(userId, contentId).map(this::toResponse)
                .orElseGet(() -> new ContentProgressResponse(null, userId, contentId, 0, false, null));
    }
    public ContentProgressResponse updateProgress(int userId, int contentId, ContentProgressRequest request) {
        Content content = requireContent(contentId);
        if (request.progressSeconds() > content.getDurationSeconds()) {
            throw new IllegalArgumentException("El progreso no puede superar la duración del contenido");
        }
        return toResponse(progressDAO.save(userId, contentId, request.progressSeconds(), request.completed()));
    }
    private Content requireContent(int contentId) {
        return contentDAO.getContentById(contentId)
                .orElseThrow(() -> new ContentNotFoundException(contentId));
    }
    private ContentProgressResponse toResponse(ContentProgress progress) {
        return new ContentProgressResponse(progress.getProgressId(), progress.getUserId(),
                progress.getContentId(), progress.getProgressSeconds(), progress.isCompleted(), progress.getUpdatedAt());
    }
}
