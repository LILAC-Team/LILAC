package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.dto.response.RecentCommentResponse;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.model.mapping.MusicImgMapping;
import com.lilacmusic.backend.musics.model.mapping.RecentCommentMapping;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.musics.model.repository.RecentCommentRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MusicServiceTest {

    @InjectMocks
    private MusicServiceImpl musicService;

    @Mock
    private MusicRepository musicRepository;

    @Mock
    private RecentCommentRepository recentCommentRepository;

    @Test
    @DisplayName("음악 상세 정보 서비스, 최신 댓글 없는 경우 테스트")
    public void getMusicDetailTest() throws NoMusicFoundException {
        // Given
        String musicCode = "test_music_code";
        Long memberId = 1L;
        MusicImgMapping music = mock(MusicImgMapping.class);
        when(music.getCode()).thenReturn(musicCode);
        when(music.getName()).thenReturn("Test Song");
        when(music.getArtistName()).thenReturn("Test Artist");
        when(music.getPlaytime()).thenReturn(180);
        when(music.getStoragePath()).thenReturn("test_storage_path");
        when(music.getAlbumImage()).thenReturn("test_album_image");

        when(musicRepository.findByCodeWithAlbumImage(musicCode)).thenReturn(Optional.of(music));

        List<RecentCommentMapping> recentComments = new ArrayList<>();
        when(recentCommentRepository.findAllByMusicIdOrderByPresentTimeAsc(anyLong())).thenReturn(recentComments);

        // When
        MusicDetailResponse response = musicService.getMusicDetail(musicCode, memberId);

        // Then
        assertEquals(music.getCode(), response.getCode());
        assertEquals(music.getName(), response.getName());
        assertEquals(music.getArtistName(), response.getArtistName());
        assertEquals(music.getPlaytime(), response.getPlaytime());
        assertEquals(music.getStoragePath(), response.getStoragePath());
        assertEquals(music.getAlbumImage(), response.getAlbumImage());
        assertTrue(response.getRecentCommentList().isEmpty());
    }


    @Test
    @DisplayName("음악 상세 정보 서비스, 최신 댓글 2개 있는 경우 테스트")
    public void getMusicDetailWithTwoRecentCommentsTest() throws NoMusicFoundException {
        // Given
        String musicCode = "music_code";
        Long memberId = 1L;

        MusicImgMapping music = mock(MusicImgMapping.class);
        when(music.getCode()).thenReturn(musicCode);
        when(music.getName()).thenReturn("Test Song");
        when(music.getArtistName()).thenReturn("Test Artist");
        when(music.getPlaytime()).thenReturn(180);
        when(music.getStoragePath()).thenReturn("test_storage_path");
        when(music.getAlbumImage()).thenReturn("test_album_image");

        RecentCommentMapping comment1 = mock(RecentCommentMapping.class);
        // Set up RecentCommentMapping for comment1 with your values
        when(comment1.getContent()).thenReturn("Test comment 1");
        when(comment1.getPresentTime()).thenReturn(10);
        when(comment1.getNickname()).thenReturn("Test User 1");
        when(comment1.getProfileImage()).thenReturn("test_profile_image_1");
        when(comment1.getEmail()).thenReturn("testuser1@example.com");

        RecentCommentMapping comment2 = mock(RecentCommentMapping.class);
        // Set up RecentCommentMapping for comment2 with your values
        when(comment2.getContent()).thenReturn("Test comment 2");
        when(comment2.getPresentTime()).thenReturn(20);
        when(comment2.getNickname()).thenReturn("Test User 2");
        when(comment2.getProfileImage()).thenReturn("test_profile_image_2");
        when(comment2.getEmail()).thenReturn("testuser2@example.com");

        List<RecentCommentMapping> recentComments = Arrays.asList(comment1, comment2);

        // When
        when(musicRepository.findByCodeWithAlbumImage(musicCode)).thenReturn(Optional.of(music));
        when(recentCommentRepository.findAllByMusicIdOrderByPresentTimeAsc(music.getMusicId())).thenReturn(recentComments);

        MusicDetailResponse response = musicService.getMusicDetail(musicCode, memberId);

        // Then
        assertEquals(2, response.getRecentCommentList().size());

        RecentCommentResponse responseComment1 = response.getRecentCommentList().get(0);
        assertEquals("Test comment 1", responseComment1.getContent());
        assertEquals(10, responseComment1.getPresentTime());
        assertEquals("Test User 1", responseComment1.getMemberInfo().getNickname());
        assertEquals("test_profile_image_1", responseComment1.getMemberInfo().getProfileImage());
        assertEquals("testuser1@example.com", responseComment1.getMemberInfo().getEmail());

        RecentCommentResponse responseComment2 = response.getRecentCommentList().get(1);
        assertEquals("Test comment 2", responseComment2.getContent());
        assertEquals(20, responseComment2.getPresentTime());
        assertEquals("Test User 2", responseComment2.getMemberInfo().getNickname());
        assertEquals("test_profile_image_2", responseComment2.getMemberInfo().getProfileImage());
        assertEquals("testuser2@example.com", responseComment2.getMemberInfo().getEmail());

        assertEquals(musicCode, response.getCode());
        assertEquals("Test Song", response.getName());
        assertEquals("Test Artist", response.getArtistName());
        assertEquals(180, response.getPlaytime());
        assertEquals("test_storage_path", response.getStoragePath());
        assertEquals("test_album_image", response.getAlbumImage());
    }

    @Test
    @DisplayName("음악 상세 정보 서비스, 음악이 없어서 예외 발생하는 경우 테스트")
    public void getMusicDetailWithNoMusicTest() {
        // Given
        String musicCode = "non_existent_music_code";
        Long memberId = 1L;

        // When
        when(musicRepository.findByCodeWithAlbumImage(musicCode)).thenReturn(Optional.empty());

        // Then
        assertThrows(NoMusicFoundException.class, () -> musicService.getMusicDetail(musicCode, memberId));
    }

    @Test
    @DisplayName("음악 코드로 음악 ID 가져오기, 음악 있을 때 성공 테스트")
    public void getMusicIdByCodeWithMusicTest() {
        // Given
        String musicCode = "test_music_code";
        Long expectedMusicId = 1L;

        // When
        when(musicRepository.findMusicIdByCode(musicCode)).thenReturn(Optional.of(expectedMusicId));
        Long actualMusicId = musicService.getMusicIdByCode(musicCode);

        // Then
        assertEquals(expectedMusicId, actualMusicId);
    }

    @Test
    @DisplayName("음악 코드로 음악 ID 가져오기, 음악 없을 때 실패 테스트")
    public void getMusicIdByCodeWithNoMusicTest() {
        // Given
        String musicCode = "test_music_code";

        // When
        when(musicRepository.findMusicIdByCode(musicCode)).thenReturn(Optional.empty());

        // Then
        assertThrows(NoMusicFoundException.class, () -> musicService.getMusicIdByCode(musicCode));
    }

}