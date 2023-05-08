package com.lilacmusic.backend.playlists.service;


import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.model.entitiy.PlayList;
import com.lilacmusic.backend.playlists.model.entitiy.PlayListMusic;
import com.lilacmusic.backend.playlists.model.repository.PlayListRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@Transactional
public class PlayListServiceTest {

    @Autowired
    private PlayListService playListService;

    @MockBean
    private PlayListRepository playListRepository;

    @MockBean
    private MusicRepository musicRepository;

    @Test
    @DisplayName("재생목록 가져오기 서비스, 리스트 있고 성공 테스트")
    public void getPlayListTest() {
        // Given
        Long memberId = 1L;
        List<PlayListMusic> musicList = new ArrayList<>();
        musicList.add(PlayListMusic.builder()
                .name("Song1")
                .artistName("Artist1")
                .playtime(180)
                .code("song1_code")
                .albumImage("song1_image")
                .build());
        musicList.add(PlayListMusic.builder()
                .name("Song2")
                .artistName("Artist2")
                .playtime(200)
                .code("song2_code")
                .albumImage("song2_image")
                .build());
        PlayList playList = PlayList.builder()
                .memberId(memberId)
                .musicList(musicList)
                .build();

        // When
        when(playListRepository.findById(memberId)).thenReturn(Optional.of(playList));
        PlayListResponse response = playListService.getPlayList(memberId);

        // Then
        assertEquals(2, response.getMusicList().size());
        assertEquals("Song1", response.getMusicList().get(0).getName());
        assertEquals("Artist1", response.getMusicList().get(0).getArtistName());
        assertEquals(180, response.getMusicList().get(0).getPlaytime());
        assertEquals("song1_code", response.getMusicList().get(0).getCode());
        assertEquals("song1_image", response.getMusicList().get(0).getAlbumImage());

        assertEquals("Song2", response.getMusicList().get(1).getName());
        assertEquals("Artist2", response.getMusicList().get(1).getArtistName());
        assertEquals(200, response.getMusicList().get(1).getPlaytime());
        assertEquals("song2_code", response.getMusicList().get(1).getCode());
        assertEquals("song2_image", response.getMusicList().get(1).getAlbumImage());
    }

    @Test
    @DisplayName("재생목록 가져오기 서비스, 없을시 생성 후 가져오는 성공 테스트")
    public void getPlayListTestWhenRepositoryReturnsEmptyOptional() {
        // Given
        Long memberId = 1L;
        when(playListRepository.findById(memberId)).thenReturn(Optional.empty());

        // When
        PlayListResponse response = playListService.getPlayList(memberId);

        // Then
        assertEquals(0, response.getMusicList().size());
        assertEquals(0, response.getListSize());
        verify(playListRepository, times(1)).save(any(PlayList.class));
    }


}
