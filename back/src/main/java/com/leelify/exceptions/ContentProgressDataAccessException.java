package com.leelify.exceptions;

public class ContentProgressDataAccessException extends RuntimeException {
    public ContentProgressDataAccessException(String message) { super(message); }
    public ContentProgressDataAccessException(String message, Throwable cause) { super(message, cause); }
}
