package com.lilacmusic.backend.common.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends Exception{
    private HttpStatus status;
    private String code;
    public CommonException(HttpStatus status, String code, String message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}
