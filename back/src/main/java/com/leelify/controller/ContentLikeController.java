package com.leelify.controller;
import com.leelify.service.ContentLikeService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
@RestController 
@RequestMapping("/api/me/contents/{contentId}/like")
public class ContentLikeController {

    private final ContentLikeService contentLikeService;



    public ContentLikeController(ContentLikeService contentLikeService){
        this.contentLikeService=contentLikeService;
    }

    @GetMapping 
    public boolean isLiked(
        @AuthenticationPrincipal Jwt jwt, 
        @PathVariable  int contentId
    ){
        int userId = Integer.parseInt(jwt.getSubject());
        return contentLikeService.isLiked(userId, contentId);
    }


    @PutMapping 
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addLike(@AuthenticationPrincipal Jwt jwt,
    @PathVariable int contentId){
        int userId = Integer.parseInt(jwt.getSubject());
        contentLikeService.addLike(userId, contentId);
    }


@DeleteMapping 
@ResponseStatus(HttpStatus.NO_CONTENT)
public void removeLike(@AuthenticationPrincipal Jwt jwt,
@PathVariable int contentId){
    int userId=Integer.parseInt(jwt.getSubject());
    contentLikeService.removeLike(userId, contentId);
}


}   

