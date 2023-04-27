package com.lilacmusic.backend.member.exception;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class MemberNotFoundException extends GlobalBaseException {

    public MemberNotFoundException(GlobalErrorCode errorCode) {
        super(errorCode);
    }
}
