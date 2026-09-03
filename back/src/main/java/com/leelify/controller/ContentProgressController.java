package com.leelify.controller;
import com.leelify.dto.ContentProgressRequest;
import com.leelify.dto.ContentProgressResponse;
import com.leelify.service.ContentProgressService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/me/contents/{contentId}/progress")
public class ContentProgressController {
    private final ContentProgressService progressService;
    public ContentProgressController(ContentProgressService progressService) { this.progressService = progressService; }

@GetMapping
public ContentProgressResponse getProgress(
        @AuthenticationPrincipal Jwt jwt,
        @PathVariable int contentId
) {
    int userId = Integer.parseInt(jwt.getSubject());

    return progressService.getProgress(userId, contentId);
}
    @PutMapping
public ContentProgressResponse updateProgress(
        @AuthenticationPrincipal Jwt jwt,
        @PathVariable int contentId,
        @Valid @RequestBody ContentProgressRequest request
) {
    int userId = Integer.parseInt(jwt.getSubject());

    return progressService.updateProgress(
            userId,
            contentId,
            request
    );
}
}
