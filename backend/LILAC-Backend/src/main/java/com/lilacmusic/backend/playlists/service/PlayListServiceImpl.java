package com.lilacmusic.backend.playlists.service;

import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.mapping.MusicImgMapping;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.model.entitiy.PlayList;
import com.lilacmusic.backend.playlists.model.entitiy.PlayListMusic;
import com.lilacmusic.backend.playlists.model.repository.PlayListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayListServiceImpl implements PlayListService {

    private final PlayListRepository playListRepository;

    private final MusicRepository musicRepository;

    @Override
    @Transactional
    public PlayListResponse getPlayList(Long userId) {
        Optional<PlayList> playList = playListRepository.findById(userId);
        if (playList.isEmpty()) {
            PlayList newPlayList = new PlayList(userId, List.of());
            playListRepository.save(newPlayList);
            return PlayListResponse.builder().listSize(0).musicList(List.of()).build();
        }

        return PlayListResponse.builder()
                .musicList(playList.get().getMusicList())
                .listSize(playList.get().getMusicList().size())
                .build();
    }

    @Override
    @Transactional
    public Long addMusicToPlayList(Long userId, PlayListAddRequest playListAddRequest) throws NoMusicFoundException {
        Optional<MusicImgMapping> music = musicRepository.findByCodeWithAlbumImage(playListAddRequest.getCode());
        if (music.isEmpty()) {
            throw new NoMusicFoundException();
        }

        Optional<PlayList> playList = playListRepository.findById(userId);
        PlayListMusic newMusic = PlayListMusic.builder()
                .code(music.get().getCode())
                .name(music.get().getName())
                .artistName(music.get().getArtistName())
                .playtime(music.get().getPlaytime())
                .albumImage(music.get().getAlbumImage())
                .build();
        if (playList.isEmpty()) {
            PlayList newPlayList = new PlayList(userId, List.of(newMusic));
            playListRepository.save(newPlayList);
        }
        List<PlayListMusic> list = playList.get().getMusicList();
        list.add(newMusic);
        playListRepository.save(new PlayList(userId, list));
        return music.get().getMusicId();
    }

    @Override
    @Transactional
    public Integer editPlayList(Long userId, PlayListRequest playListRequest) {
        PlayList playList = new PlayList(userId, playListRequest.getMusicList());
        playListRepository.save(playList);
        return playListRequest.getMusicList().size();
    }
}
