package com.leelify.exceptions;

public class AudiobookNotFoundException extends RuntimeException {
    public AudiobookNotFoundException(int audioId) {
        super("No existe un audiolibro con el id " + audioId);
    }
}
