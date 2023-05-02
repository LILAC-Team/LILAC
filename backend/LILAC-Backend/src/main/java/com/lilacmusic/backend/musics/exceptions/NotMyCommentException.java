package com.lilacmusic.backend.musics.exceptions;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class NotMyCommentException extends GlobalBaseException {
    public NotMyCommentException() {
        super(GlobalErrorCode.COMMENT_NOT_MINE);
    }
}
