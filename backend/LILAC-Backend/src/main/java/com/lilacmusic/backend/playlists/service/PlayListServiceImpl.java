package com.lilacmusic.backend.playlists.service;

import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.model.repository.PlayListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlayListServiceImpl implements PlayListService {

    private final PlayListRepository playListRepository;

    @Override
    public PlayListResponse getPlayList(Long userId) {
        return null;
    }

    @Override
    public Long addMusicToPlayList(Long userId, PlayListAddRequest playListAddRequest) {
        return null;
    }

    @Override
    public Integer editPlayList(Long userId, PlayListRequest playListRequest) {
        return null;
    }
}
