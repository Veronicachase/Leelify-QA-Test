package com.leelify.model;

import java.time.LocalDateTime;

public class Content {
    private int contentId;
    private ContentType contentType;
    private String title;
    private String description;
    private String category;
    private int durationSeconds;
    private int points;
    private int chapters;
    private String author;
    private String thumbnailUrl;
    private String mediaUrl;
    private int grade;
    private LocalDateTime createdAt;
    private boolean featured;
    private int playCount;

    public int getContentId() { return contentId; }
    public void setContentId(int contentId) { this.contentId = contentId; }
    public ContentType getContentType() { return contentType; }
    public void setContentType(ContentType contentType) { this.contentType = contentType; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(int durationSeconds) { this.durationSeconds = durationSeconds; }
    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
    public int getChapters() { return chapters; }
    public void setChapters(int chapters) { this.chapters = chapters; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }
    public int getGrade() { return grade; }
    public void setGrade(int grade) { this.grade = grade; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public int getPlayCount() { return playCount; }
    public void setPlayCount(int playCount) { this.playCount = playCount; }
}
