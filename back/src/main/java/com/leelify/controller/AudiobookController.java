package com.leelify.controller;

import com.leelify.model.Audiobook;
import com.leelify.service.AudiobookService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/audiobooks")
public class AudiobookController {
    private final AudiobookService audiobookService;

    public AudiobookController(AudiobookService audiobookService) {
        this.audiobookService = audiobookService;
    }

    @GetMapping
    public List<Audiobook> getAudiobooks(
            @RequestParam(required = false) Integer grade
    ) {
        return audiobookService.getAudiobooks(grade);
    }

    @GetMapping("/{audioId}")
    public Audiobook getAudiobookById(@PathVariable int audioId) {
        return audiobookService.getAudiobookById(audioId);
    }
}
