package com.leelify.service;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {
        super("Email o contraseña incorrectos");
    }
}
