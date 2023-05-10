package com.lilacmusic.backend.playlists.service;


import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.model.mapping.MusicImgMapping;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.model.entitiy.PlayList;
import com.lilacmusic.backend.playlists.model.entitiy.PlayListMusic;
import com.lilacmusic.backend.playlists.model.repository.PlayListRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PlayListServiceTest {

    @InjectMocks
    private PlayListServiceImpl playListService;

    @Mock
    private PlayListRepository playListRepository;

    @Mock
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

    @Test
    @DisplayName("재생목록에 곡추가 서비스, 성공 테스트")
    public void addMusicToPlayListTest() throws NoMusicFoundException {
        // Given
        Long memberId = 1L;
        String code = "test_code";
        PlayListAddRequest request = PlayListAddRequest.builder().code(code).build();

        MusicImgMapping music = new MusicImgMapping() {
            @Override
            public Long getMusicId() {
                return 1L;
            }

            @Override
            public String getCode() {
                return code;
            }

            @Override
            public String getName() {
                return "Test Song";
            }

            @Override
            public String getArtistName() {
                return "Test Artist";
            }

            @Override
            public Integer getPlaytime() {
                return 180;
            }

            @Override
            public String getStoragePath() {
                return "test_storage_path";
            }

            @Override
            public String getAlbumImage() {
                return "test_image";
            }
        };

        PlayList existingPlayList = PlayList.builder()
                .memberId(memberId)
                .musicList(new ArrayList<>())
                .build();

        when(musicRepository.findByCodeWithAlbumImage(code)).thenReturn(Optional.of(music));
        when(playListRepository.findById(memberId)).thenReturn(Optional.of(existingPlayList));
        // When

        Long addedMusicId = playListService.addMusicToPlayList(memberId, request);

        // Then
        assertEquals(1L, addedMusicId.longValue());
        verify(musicRepository, times(1)).findByCodeWithAlbumImage(code);
        verify(playListRepository, times(1)).findById(memberId);
        verify(playListRepository, times(1)).save(any(PlayList.class));
    }

    @Test
    @DisplayName("재생목록에 곡추가 서비스, 음원 없어서 실패 테스트")
    public void addMusicToPlayList_whenMusicNotFound() {
        // Given
        Long memberId = 1L;
        String code = "test_code";
        PlayListAddRequest request = PlayListAddRequest.builder().code(code).build();

        when(musicRepository.findByCodeWithAlbumImage(code)).thenReturn(Optional.empty());

        // When
        assertThrows(NoMusicFoundException.class, () -> playListService.addMusicToPlayList(memberId, request));

        // Then
        verify(musicRepository, times(1)).findByCodeWithAlbumImage(code);
        verify(playListRepository, times(0)).findById(anyLong());
        verify(playListRepository, times(0)).save(any(PlayList.class));
    }

    @Test
    @DisplayName("재생목록에 곡추가 서비스, 재생목록 생성 및 성공 테스트")
    public void addMusicToPlayList_whenPlayListNotFound() throws NoMusicFoundException {
        // Given
        Long memberId = 1L;
        String code = "test_code";
        PlayListAddRequest request = PlayListAddRequest.builder().code(code).build();

        MusicImgMapping music = new MusicImgMapping() {
            @Override
            public Long getMusicId() {
                return 1L;
            }

            @Override
            public String getCode() {
                return code;
            }

            @Override
            public String getName() {
                return "Test Song";
            }

            @Override
            public String getArtistName() {
                return "Test Artist";
            }

            @Override
            public Integer getPlaytime() {
                return 180;
            }

            @Override
            public String getStoragePath() {
                return "test_storage_path";
            }

            @Override
            public String getAlbumImage() {
                return "test_image";
            }
        };

        when(musicRepository.findByCodeWithAlbumImage(code)).thenReturn(Optional.of(music));
        when(playListRepository.findById(memberId)).thenReturn(Optional.empty());

        // When
        Long addedMusicId = playListService.addMusicToPlayList(memberId, request);

        // Then
        assertEquals(1L, addedMusicId.longValue());
        verify(musicRepository, times(1)).findByCodeWithAlbumImage(code);
        verify(playListRepository, times(1)).findById(memberId);
        verify(playListRepository, times(1)).save(any(PlayList.class));
    }

    @Test
    @DisplayName("재생목록 편집 서비스, 성공 테스트")
    public void editPlayListTest() {
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
        PlayListRequest playListRequest = PlayListRequest.builder()
                .musicList(musicList)
                .build();

        // When
        Integer updatedListSize = playListService.editPlayList(memberId, playListRequest);

        // Then
        assertEquals(2, updatedListSize.intValue());
        verify(playListRepository, times(1)).save(any(PlayList.class));
    }

    @Test
    @DisplayName("재생목록 편집 서비스, 빈 리스트 성공 테스트")
    public void editPlayListWithEmptyListTest() {
        // Given
        Long memberId = 1L;
        List<PlayListMusic> emptyMusicList = new ArrayList<>();
        PlayListRequest playListRequest = PlayListRequest.builder()
                .musicList(emptyMusicList)
                .build();

        // When
        Integer updatedListSize = playListService.editPlayList(memberId, playListRequest);

        // Then
        assertEquals(0, updatedListSize.intValue());
        verify(playListRepository, times(1)).save(any(PlayList.class));
    }


}
