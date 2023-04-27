package com.lilacmusic.backend.member.exception;


import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class UserNotFoundException extends GlobalBaseException {

    public UserNotFoundException() {
        super(GlobalErrorCode.USER_NOT_FOUND);
    }
}
