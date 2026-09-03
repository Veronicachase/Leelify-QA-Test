package com.leelify.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ContentProgressRequest(
        @NotNull @PositiveOrZero Integer progressSeconds,
        @NotNull Boolean completed
) {
}
