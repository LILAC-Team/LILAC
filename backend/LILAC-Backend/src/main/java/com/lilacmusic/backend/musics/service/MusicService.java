package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;

public interface MusicService {
    MusicDetailResponse getMusicDetail(String musicCode, Long userId) throws NoMusicFoundException;
}
