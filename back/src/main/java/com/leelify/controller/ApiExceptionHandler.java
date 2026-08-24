package com.leelify.controller;

import com.leelify.exceptions.DuplicateEmailException;
import com.leelify.exceptions.AudiobookDataAccessException;
import com.leelify.exceptions.AudiobookNotFoundException;
import com.leelify.exceptions.AudiobookProgressDataAccessException;
import com.leelify.service.InvalidCredentialsException;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @ExceptionHandler(AudiobookNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleAudiobookNotFound(AudiobookNotFoundException exception) {
        return Map.of("message", exception.getMessage());
    }

    @ExceptionHandler(AudiobookDataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleAudiobookDataAccess(AudiobookDataAccessException exception) {
        LOGGER.error("Error al consultar el catálogo de audiolibros", exception);
        return Map.of("message", "No se pudo acceder al catálogo de audiolibros");
    }

    @ExceptionHandler(AudiobookProgressDataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleAudiobookProgressDataAccess(
            AudiobookProgressDataAccessException exception
    ) {
        LOGGER.error("Error al consultar el progreso de audiolibros", exception);
        return Map.of("message", "No se pudo acceder al progreso del audiolibro");
    }

    @ExceptionHandler(DuplicateEmailException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleDuplicateEmail(DuplicateEmailException exception) {
        return Map.of("message", exception.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleInvalidCredentials(InvalidCredentialsException exception) {
        return Map.of("message", exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidation(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .orElse("Los datos enviados no son válidos");

        return Map.of("message", message);
    }
}
