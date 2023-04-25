package com.lilacmusic.backend.common.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class CommonExceptionResponse {
    HttpStatus status;
    String code;
    String message;
}
