package com.lilacmusic.backend.albums.exceptions;

import com.lilacmusic.backend.global.error.GlobalBaseException;
import com.lilacmusic.backend.global.error.GlobalErrorCode;

public class NoAlbumFoundException extends GlobalBaseException {
    public NoAlbumFoundException() {
        super(GlobalErrorCode.ALBUM_NOT_FOUND);
    }
}


