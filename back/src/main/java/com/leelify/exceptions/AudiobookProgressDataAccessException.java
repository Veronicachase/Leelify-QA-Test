package com.leelify.exceptions;

public class AudiobookProgressDataAccessException
        extends RuntimeException {

    public AudiobookProgressDataAccessException(String message) {
        super(message);
    }

    public AudiobookProgressDataAccessException(
            String message,
            Throwable cause
    ) {
        super(message, cause);
    }
}
