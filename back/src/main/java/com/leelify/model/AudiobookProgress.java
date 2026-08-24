package com.leelify.model;

import java.time.LocalDateTime;

public class AudiobookProgress {
    private int progressId;
    private int userId;
    private int audioId;
    private int listenedSeconds;
    private boolean completed;
    private LocalDateTime updatedAt;

    public int getProgressId() {
        return progressId;
    }

    public void setProgressId(int progressId) {
        this.progressId = progressId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAudioId() {
        return audioId;
    }

    public void setAudioId(int audioId) {
        this.audioId = audioId;
    }

    public int getListenedSeconds() {
        return listenedSeconds;
    }

    public void setListenedSeconds(int listenedSeconds) {
        this.listenedSeconds = listenedSeconds;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
