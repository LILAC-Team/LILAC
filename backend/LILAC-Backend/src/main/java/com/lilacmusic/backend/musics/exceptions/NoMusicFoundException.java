package com.lilacmusic.backend.musics.exceptions;

import com.lilacmusic.backend.common.exceptions.CommonException;
import org.springframework.http.HttpStatus;

public class NoMusicFoundException extends CommonException {
    public NoMusicFoundException() {
        super(HttpStatus.NOT_FOUND, "NoMusicFoundException", "해당하는 음원이 없습니다.");
    }
}
