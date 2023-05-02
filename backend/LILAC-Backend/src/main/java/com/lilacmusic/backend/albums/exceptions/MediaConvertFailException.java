package com.lilacmusic.backend.albums.exceptions;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class MediaConvertFailException extends GlobalBaseException {
    public MediaConvertFailException() {
        super(GlobalErrorCode.MEDIA_CONVERT_FAIL);
    }
}
