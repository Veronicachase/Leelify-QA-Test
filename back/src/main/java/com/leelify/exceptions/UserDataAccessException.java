package com.leelify.exceptions;

public class UserDataAccessException extends RuntimeException {
    public UserDataAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}
