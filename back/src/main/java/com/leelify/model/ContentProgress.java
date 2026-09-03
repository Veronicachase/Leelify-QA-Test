package com.leelify.model;

import java.time.LocalDateTime;

public class ContentProgress {
    private int progressId;
    private int userId;
    private int contentId;
    private int progressSeconds;
    private boolean completed;
    private LocalDateTime updatedAt;

    public int getProgressId() { return progressId; }
    public void setProgressId(int progressId) { this.progressId = progressId; }
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
    public int getContentId() { return contentId; }
    public void setContentId(int contentId) { this.contentId = contentId; }
    public int getProgressSeconds() { return progressSeconds; }
    public void setProgressSeconds(int progressSeconds) { this.progressSeconds = progressSeconds; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
