package com.leelify.controller;
import com.leelify.dto.ContentResponse;
import com.leelify.model.ContentType;
import com.leelify.service.ContentService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@Validated
@RestController
@RequestMapping("/api/contents")
public class ContentController {
    private final ContentService contentService;
    public ContentController(ContentService contentService) { this.contentService = contentService; }
    @GetMapping
    public List<ContentResponse> getContents(
            @RequestParam(required = false) @Min(1) @Max(12) Integer grade,
            @RequestParam(required = false) ContentType type) {
        return contentService.getContents(grade, type);
    }
    @GetMapping("/{contentId}")
    public ContentResponse getContentById(@PathVariable int contentId) {
        return contentService.getContentById(contentId);
    }
}
