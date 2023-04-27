package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;

public interface UserCollectAlbumService {
    Long collectAlbum(String code, Long memberId) throws NoAlbumFoundException;
}
