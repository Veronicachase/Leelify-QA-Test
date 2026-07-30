package com.leelify.model;

public class Audiobook {
    private int audioId;
    private String title;
    private int durationSeconds;
    private int points;
    private int chapters;
    private String author;
    private String imageUrl;
    private String audioUrl;
    private int grade;

    public int getAudioId() {
        return audioId;
    }

    public void setAudioId(int audioId) {
        this.audioId = audioId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getDurationSeconds() {
        return durationSeconds;
    }

    public void setDurationSeconds(int durationSeconds) {
        this.durationSeconds = durationSeconds;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getChapters() {
        return chapters;
    }

    public void setChapters(int chapters) {
        this.chapters = chapters;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }
}
