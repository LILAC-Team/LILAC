package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;

public interface AlbumService {
    ReleasedAlbumListResponse getReleasedAlbums(Integer pageNumber, Long userId);

    CollectedAlbumListResponse getCollectedAlbums(Integer pageNumber, Long userId);
}
