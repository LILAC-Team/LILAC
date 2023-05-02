package com.lilacmusic.backend.global.error.common;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class UploadFailException extends GlobalBaseException {
    public UploadFailException() {
        super(GlobalErrorCode.UPLOAD_FAIL);
    }
}
