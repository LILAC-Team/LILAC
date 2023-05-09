package com.lilacmusic.backend.musics.exceptions;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class NoMusicFoundException extends GlobalBaseException {
    public NoMusicFoundException() {
        super(GlobalErrorCode.MUSIC_NOT_FOUND);
    }
}
