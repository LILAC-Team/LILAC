package com.lilacmusic.backend.common.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<CommonExceptionResponse> commonExceptionHandle(CommonException commonException){
        log.error(commonException.getMessage());
        return ResponseEntity.status(commonException.getStatus()).body(new CommonExceptionResponse(
                commonException.getStatus(),
                commonException.getCode(),
                commonException.getMessage()
        ));
    }
}
