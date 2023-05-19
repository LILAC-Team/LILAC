package com.lilacmusic.backend.global.security.oauth2;


import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

/**
 * 지원하지 않는 oauth 로그인타입
 */
public class UnsupportedInfoException extends GlobalBaseException {
    public UnsupportedInfoException() {
        super(GlobalErrorCode.UNSUPPORTED_INFO);
    }
}
