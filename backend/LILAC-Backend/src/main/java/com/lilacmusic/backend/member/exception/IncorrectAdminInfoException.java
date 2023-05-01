package com.lilacmusic.backend.member.exception;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class IncorrectAdminInfoException extends GlobalBaseException {
    public IncorrectAdminInfoException() {
        super(GlobalErrorCode.INCORRECT_ADMIN_INFO);
    }
}
