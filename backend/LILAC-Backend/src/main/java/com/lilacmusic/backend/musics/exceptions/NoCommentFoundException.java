package com.lilacmusic.backend.musics.exceptions;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class NoCommentFoundException extends GlobalBaseException {
    public NoCommentFoundException() {
        super(GlobalErrorCode.COMMENT_NOT_FOUND);
    }
}
