package com.lilacmusic.backend.musics.exceptions;

import com.lilacmusic.backend.common.exceptions.CommonException;
import org.springframework.http.HttpStatus;

public class NotMyCommentException extends CommonException {
    public NotMyCommentException() {
        super(HttpStatus.FORBIDDEN, "NotMyCommentException", "다른 사람이 쓴 댓글입니다.");
    }
}
