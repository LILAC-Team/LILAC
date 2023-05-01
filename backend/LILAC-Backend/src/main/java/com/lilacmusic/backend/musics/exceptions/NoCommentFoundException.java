package com.lilacmusic.backend.musics.exceptions;

import com.lilacmusic.backend.common.exceptions.CommonException;
import org.springframework.http.HttpStatus;

public class NoCommentFoundException extends CommonException {
    public NoCommentFoundException() {
        super(HttpStatus.NOT_FOUND, "NoCommentFoundException", "해당하는 댓글이 없습니다.");
    }
}
