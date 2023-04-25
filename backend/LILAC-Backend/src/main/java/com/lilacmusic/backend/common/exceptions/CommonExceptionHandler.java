package com.lilacmusic.backend.common.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<CommonException> commonExceptionHandle(CommonException commonException){
        return ResponseEntity.status(commonException.getStatus()).body(commonException);
    }
}
