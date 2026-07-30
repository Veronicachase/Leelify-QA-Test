package com.leelify.service;

import com.leelify.dao.AudiobookDAO;
import com.leelify.exceptions.AudiobookNotFoundException;
import com.leelify.model.Audiobook;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AudiobookService {
    private final AudiobookDAO audiobookDAO;

    public AudiobookService(AudiobookDAO audiobookDAO) {
        this.audiobookDAO = audiobookDAO;
    }

    public List<Audiobook> getAudiobooks(Integer grade) {
        return grade == null
                ? audiobookDAO.getAllAudiobooks()
                : audiobookDAO.getAudiobooksByGrade(grade);
    }

    public Audiobook getAudiobookById(int audioId) {
        return audiobookDAO.getAudiobookById(audioId)
                .orElseThrow(() -> new AudiobookNotFoundException(audioId));
    }
}
