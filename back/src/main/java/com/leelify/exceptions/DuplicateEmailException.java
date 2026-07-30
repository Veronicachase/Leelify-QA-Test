package com.leelify.exceptions;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String email, Throwable cause) {
        super("Ya existe una cuenta con el email " + email, cause);
    }
}
