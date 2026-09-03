package com.leelify.service;
import com.leelify.dao.ContentDAO;
import com.leelify.dto.ContentResponse;
import com.leelify.exceptions.ContentNotFoundException;
import com.leelify.model.ContentType;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ContentService {
    private final ContentDAO contentDAO;
    public ContentService(ContentDAO contentDAO) { this.contentDAO = contentDAO; }
    public List<ContentResponse> getContents(Integer grade, ContentType type) {
        return contentDAO.getContents(grade, type).stream().map(ContentResponse::from).toList();
    }
    public ContentResponse getContentById(int contentId) {
        return contentDAO.getContentById(contentId).map(ContentResponse::from)
                .orElseThrow(() -> new ContentNotFoundException(contentId));
    }
}
