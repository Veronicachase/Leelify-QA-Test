package com.leelify.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class AudiobookProgressRequest {

    @NotNull(message = "es obligatorio")
    @PositiveOrZero(message = "debe ser mayor o igual que cero")
    private Integer listenedSeconds;

    @NotNull(message = "es obligatorio")
    private Boolean completed;

    public Integer getListenedSeconds() {
        return listenedSeconds;
    }

    public void setListenedSeconds(Integer listenedSeconds) {
        this.listenedSeconds = listenedSeconds;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}

