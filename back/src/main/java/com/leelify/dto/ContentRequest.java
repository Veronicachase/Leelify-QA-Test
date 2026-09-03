package com.leelify.dto;

import com.leelify.model.ContentType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ContentRequest(
        @NotNull ContentType contentType,
        @NotBlank @Size(max = 250) String title,
        @Size(max = 500) String description,
        @Size(max = 100) String category,
        @NotNull @Positive Integer durationSeconds,
        @NotNull @PositiveOrZero Integer points,
        @NotNull @Positive Integer chapters,
        @NotBlank @Size(max = 250) String author,
        @NotBlank @Size(max = 2048) String thumbnailUrl,
        @NotBlank @Size(max = 2048) String mediaUrl,
        @NotNull @Min(1) @Max(12) Integer grade
) {
}
