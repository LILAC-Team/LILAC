package com.lilacmusic.backend.playlists.service;

import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;

public interface PlayListService {
    PlayListResponse getPlayList(Long userId);

    Long addMusicToPlayList(Long userId, PlayListAddRequest playListAddRequest) throws NoMusicFoundException;

    Integer editPlayList(Long userId, PlayListRequest playListRequest);
}
