package com.lilacmusic.backend.global.error.common;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class InvalidPathVariableException extends GlobalBaseException {
    public InvalidPathVariableException() {
        super(GlobalErrorCode.VALID_EXCEPTION);
    }
}
