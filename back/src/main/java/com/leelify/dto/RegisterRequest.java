package com.leelify.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email @Size(max = 250) String email,
        @NotBlank @Size(min = 8, max = 128) String password,
        @Min(1) @Max(12) int grade
) {
}
