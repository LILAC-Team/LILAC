package com.lilacmusic.backend.member.exception;


import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class AccessDeniedException extends GlobalBaseException {

    public AccessDeniedException(GlobalErrorCode errorCode) {
        super(errorCode);
    }
}
