package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.response.AlbumDetailResponse;
import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;

public interface AlbumService {
    ReleasedAlbumListResponse getReleasedAlbums(Integer pageNumber, Long memberId);

    CollectedAlbumListResponse getCollectedAlbums(Integer pageNumber, Long memberId);

    AlbumDetailResponse getAlbumDetail(String albumCode, Long memberId) throws NoAlbumFoundException;

    String getCodeByAlbumId(Long albumId) throws NoAlbumFoundException;
}
