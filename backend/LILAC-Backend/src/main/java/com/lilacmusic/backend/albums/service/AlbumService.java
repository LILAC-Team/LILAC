package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.response.AlbumDetailResponse;
import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;

public interface AlbumService {
    ReleasedAlbumListResponse getReleasedAlbums(Integer pageNumber, Long userId);

    CollectedAlbumListResponse getCollectedAlbums(Integer pageNumber, Long userId);

    AlbumDetailResponse getAlbumDetail(String albumCode, Long userId) throws NoAlbumFoundException;
}
