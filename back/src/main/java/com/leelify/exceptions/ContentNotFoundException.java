package com.leelify.exceptions;

public class ContentNotFoundException extends RuntimeException {
    public ContentNotFoundException(int contentId) {
        super("No existe un contenido con el id " + contentId);
    }
}
