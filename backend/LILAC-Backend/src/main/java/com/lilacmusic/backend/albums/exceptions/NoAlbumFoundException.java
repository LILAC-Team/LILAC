package com.lilacmusic.backend.albums.exceptions;

import com.lilacmusic.backend.common.exceptions.CommonException;
import org.springframework.http.HttpStatus;

public class NoAlbumFoundException extends CommonException {

    public NoAlbumFoundException() {
        super(HttpStatus.NOT_FOUND, "NoAlbumFoundException", "해당하는 앨범이 없습니다.");
    }
}
