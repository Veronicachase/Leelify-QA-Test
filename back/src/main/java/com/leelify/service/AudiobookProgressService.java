
package com.leelify.service;

import com.leelify.dao.AudiobookProgressDao;
import com.leelify.dto.AudiobookProgressRequest;
import com.leelify.dto.AudiobookProgressResponse;
import com.leelify.model.AudiobookProgress;
import org.springframework.stereotype.Service;

  @Service
public class AudiobookProgressService {
    private final AudiobookProgressDao audiobookProgressDao;

    public AudiobookProgressService(AudiobookProgressDao audiobookProgressDao) {
        this.audiobookProgressDao = audiobookProgressDao;
    }

   public AudiobookProgressResponse getProgress(
        int userId,
        int audioId
) {
    return audiobookProgressDao
            .findByUserIdAndAudioId(userId, audioId)
            .map(progress -> toResponse(progress))
            .orElseGet(() -> emptyProgressResponse(userId, audioId));
}

    public AudiobookProgressResponse updateProgress(
            int userId,
            int audioId,
            AudiobookProgressRequest request
    ) {
        AudiobookProgress progress = audiobookProgressDao.save(
                userId,
                audioId,
                request.getListenedSeconds(),
                request.getCompleted()
        );
        return toResponse(progress);
    }

   private AudiobookProgressResponse emptyProgressResponse(
        int userId,
        int audioId
) {
    AudiobookProgressResponse response =
            new AudiobookProgressResponse();

    response.setUserId(userId);
    response.setAudioId(audioId);
    response.setListenedSeconds(0);
    response.setCompleted(false);

    return response;
}

    private AudiobookProgressResponse toResponse(AudiobookProgress progress) {
        AudiobookProgressResponse response = new AudiobookProgressResponse();
        response.setProgressId(progress.getProgressId());
        response.setUserId(progress.getUserId());
        response.setAudioId(progress.getAudioId());
        response.setListenedSeconds(progress.getListenedSeconds());
        response.setCompleted(progress.isCompleted());
        response.setUpdatedAt(progress.getUpdatedAt());
        return response;
    }
}
