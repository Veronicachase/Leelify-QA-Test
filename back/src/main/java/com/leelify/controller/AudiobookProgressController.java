package com.leelify.controller;


import com.leelify.dto.AudiobookProgressRequest;
import com.leelify.dto.AudiobookProgressResponse;
import com.leelify.service.AudiobookProgressService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/{userId}/audiobooks/{audioId}/progress")

public class AudiobookProgressController {
   private final AudiobookProgressService audiobookProgressService;

    public AudiobookProgressController(AudiobookProgressService audiobookProgressService) {
        this.audiobookProgressService = audiobookProgressService;
    }

    @GetMapping
    public AudiobookProgressResponse getAudiobookProgress(@PathVariable int userId,
                                                           @PathVariable int audioId) {
        return audiobookProgressService.getProgress(userId, audioId);
    }
    

    @PutMapping
    public AudiobookProgressResponse UpdateAudiobookProgress(@PathVariable int userId,
                                                            @PathVariable int audioId,
                                                            @RequestBody @Valid AudiobookProgressRequest request) {
        return audiobookProgressService.updateProgress(userId, audioId, request);
    }

    

}
