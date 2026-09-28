package com.leelify.service;
import com.leelify.dao.ContentLikeDAO;
import org.springframework.stereotype.Service;
import com.leelify.dao.ContentDAO;
import com.leelify.exceptions.ContentNotFoundException;


@Service 
public class ContentLikeService {
    private final ContentLikeDAO contentLikeDAO;
    private final ContentDAO contentDAO;
    public ContentLikeService(ContentLikeDAO contentLikeDAO, ContentDAO contentDAO){
        this.contentLikeDAO = contentLikeDAO;
        this.contentDAO = contentDAO;
        
    }
    public boolean isLiked(int userId, int contentId){
        requiredContent(contentId);
        return contentLikeDAO.exists(userId, contentId);
    }


    public void addLike(int userid, int contentId){
        requiredContent(contentId);
        contentLikeDAO.addLike(userid, contentId);
    }
    public void removeLike(int userId, int contentId){
        requiredContent(contentId);
        contentLikeDAO.removeLike(userId, contentId);
    }

    private void requiredContent(int contentId){
        if(contentDAO.getContentById(contentId).isEmpty()){
            throw new ContentNotFoundException(contentId);
        }



    }



    
}
