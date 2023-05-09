package com.lilacmusic.backend.albums.service;


import com.lilacmusic.backend.albums.dto.response.*;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.model.entitiy.UserCollectAlbum;
import com.lilacmusic.backend.albums.model.mapping.AlbumDetailMapping;
import com.lilacmusic.backend.albums.model.mapping.AlbumMapping;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.albums.model.repository.UserCollectAlbumRepository;
import com.lilacmusic.backend.musics.dto.response.MusicResponse;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AlbumServiceTest {

    @InjectMocks
    private AlbumServiceImpl albumService;

    @Mock
    private AlbumRepository albumRepository;

    @Mock
    private MusicRepository musicRepository;

    @Mock
    private UserCollectAlbumRepository userCollectAlbumRepository;

    private static final int PAGE_SIZE = 6;

    @Test
    @DisplayName("발매된 앨범 목록 조회 테스트")
    public void getReleasedAlbumsTest() {
        // Given
        Integer pageNumber = 1;
        Long memberId = 1L;

        AlbumMapping albumMapping1 = mock(AlbumMapping.class);
        when(albumMapping1.getCode()).thenReturn("album_code1");
        when(albumMapping1.getName()).thenReturn("Album 1");
        when(albumMapping1.getAlbumImage()).thenReturn("album_image1");
        when(albumMapping1.getReleasedDate()).thenReturn(LocalDateTime.now());
        when(albumMapping1.getNickname()).thenReturn("Artist 1");

        AlbumMapping albumMapping2 = mock(AlbumMapping.class);
        when(albumMapping2.getCode()).thenReturn("album_code2");
        when(albumMapping2.getName()).thenReturn("Album 2");
        when(albumMapping2.getAlbumImage()).thenReturn("album_image2");
        when(albumMapping2.getReleasedDate()).thenReturn(LocalDateTime.now());
        when(albumMapping2.getNickname()).thenReturn("Artist 2");

        List<AlbumMapping> albumMappingList = List.of(albumMapping1, albumMapping2);
        Page<AlbumMapping> albumPage = new PageImpl<>(albumMappingList, PageRequest.of(0, PAGE_SIZE, Sort.Direction.DESC, "releasedDate"), albumMappingList.size());

        // When
        when(albumRepository.getAlbumsByMemberId(memberId, PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "releasedDate"))).thenReturn(albumPage);

        // Then
        ReleasedAlbumListResponse response = albumService.getReleasedAlbums(pageNumber, memberId);
        assertEquals(albumPage.getContent().size(), response.getReleasedAlbumList().size());
        assertEquals(albumMapping1.getName(), response.getReleasedAlbumList().get(0).getName());
        assertEquals(albumMapping2.getName(), response.getReleasedAlbumList().get(1).getName());
    }

    @Test
    @DisplayName("발매된 앨범 목록 조회 테스트 - 빈 페이지")
    public void getReleasedAlbumsEmptyPageTest() {
        // Given
        Integer pageNumber = 1;
        Long memberId = 1L;

        List<AlbumMapping> albumMappingList = Collections.emptyList();
        Page<AlbumMapping> emptyAlbumPage = new PageImpl<>(albumMappingList, PageRequest.of(0, PAGE_SIZE, Sort.Direction.DESC, "releasedDate"), albumMappingList.size());

        // When
        when(albumRepository.getAlbumsByMemberId(memberId, PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "releasedDate"))).thenReturn(emptyAlbumPage);

        // Then
        ReleasedAlbumListResponse response = albumService.getReleasedAlbums(pageNumber, memberId);
        assertTrue(response.getReleasedAlbumList().isEmpty());
    }

    @Test
    @DisplayName("수집된 앨범 목록 조회 테스트 - 앨범 2개")
    public void getCollectedAlbumsTwoAlbumsTest() {
        // Given
        Integer pageNumber = 1;
        Long memberId = 1L;

        AlbumMapping albumMapping1 = mock(AlbumMapping.class);
        when(albumMapping1.getCode()).thenReturn("album_code1");
        when(albumMapping1.getName()).thenReturn("Album 1");
        when(albumMapping1.getAlbumImage()).thenReturn("album_image1");
        when(albumMapping1.getReleasedDate()).thenReturn(LocalDateTime.now());
        when(albumMapping1.getNickname()).thenReturn("Artist 1");

        AlbumMapping albumMapping2 = mock(AlbumMapping.class);
        when(albumMapping2.getCode()).thenReturn("album_code2");
        when(albumMapping2.getName()).thenReturn("Album 2");
        when(albumMapping2.getAlbumImage()).thenReturn("album_image2");
        when(albumMapping2.getReleasedDate()).thenReturn(LocalDateTime.now());
        when(albumMapping2.getNickname()).thenReturn("Artist 2");


        List<AlbumMapping> albumMappingList = Arrays.asList(albumMapping1, albumMapping2);
        Page<AlbumMapping> albumPage = new PageImpl<>(albumMappingList, PageRequest.of(0, PAGE_SIZE, Sort.Direction.DESC, "createdTime"), albumMappingList.size());

        // When
        when(albumRepository.getAlbumsByUserCollectAlbums(memberId, PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "createdTime"))).thenReturn(albumPage);

        // Then
        CollectedAlbumListResponse response = albumService.getCollectedAlbums(pageNumber, memberId);
        assertEquals(2, response.getCollectedAlbumList().size());
        assertEquals(albumMapping1.getName(), response.getCollectedAlbumList().get(0).getName());
        assertEquals(albumMapping2.getName(), response.getCollectedAlbumList().get(1).getName());
    }

    @Test
    @DisplayName("수집된 앨범 목록 조회 테스트 - 빈 페이지")
    public void getCollectedAlbumsEmptyPageTest() {
        // Given
        Integer pageNumber = 1;
        Long memberId = 1L;

        List<AlbumMapping> albumMappingList = Collections.emptyList();
        Page<AlbumMapping> emptyAlbumPage = new PageImpl<>(albumMappingList, PageRequest.of(0, PAGE_SIZE, Sort.Direction.DESC, "createdTime"), albumMappingList.size());

        // When
        when(albumRepository.getAlbumsByUserCollectAlbums(memberId, PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "createdTime"))).thenReturn(emptyAlbumPage);

        // Then
        CollectedAlbumListResponse response = albumService.getCollectedAlbums(pageNumber, memberId);
        assertTrue(response.getCollectedAlbumList().isEmpty());
    }

    @Test
    @DisplayName("앨범 상세 정보 조회 테스트 - 앨범 정보 있음")
    public void getAlbumDetailTest() {
        // Given
        String albumCode = "album1";
        Long memberId = 1L;

        AlbumDetailMapping albumDetailMapping = mock(AlbumDetailMapping.class);
        when(albumDetailMapping.getAlbumId()).thenReturn(1L);
        when(albumDetailMapping.getMemberId()).thenReturn(memberId);
        when(albumDetailMapping.getCode()).thenReturn(albumCode);
        when(albumDetailMapping.getName()).thenReturn("Test Album 1");
        when(albumDetailMapping.getAlbumImage()).thenReturn("test_album_image_1");
        when(albumDetailMapping.getReleasedDate()).thenReturn(LocalDateTime.now());
        when(albumDetailMapping.getNickname()).thenReturn("Test Artist 1");
        when(albumDetailMapping.getProfileImage()).thenReturn("test_profile_image_1");
        when(albumDetailMapping.getEmail()).thenReturn("test@example.com");

        when(albumRepository.getAlbumByCodeWithDetail(albumCode)).thenReturn(Optional.of(albumDetailMapping));

        Music music1 = new Music(1L, 1L, "Test Music 1", "Test Artist 1", 300, "music1.m3u8", "music1", 1, true);
        Music music2 = new Music(2L, 1L, "Test Music 2", "Test Artist 1", 300, "music2.m3u8", "music2", 2, false);
        when(musicRepository.getAllByAlbumIdOrderByMusicIndex(albumDetailMapping.getAlbumId())).thenReturn(Arrays.asList(music1, music2));

        // When
        AlbumDetailResponse response = albumService.getAlbumDetail(albumCode, memberId);

        // Then
        assertEquals(albumCode, response.getCode());
        assertEquals(AlbumStatus.RELEASED, response.getAlbumStatus());
        assertEquals(2, response.getMusicList().size());
        assertMusicResponse(response.getMusicList().get(0), music1);
        assertMusicResponse(response.getMusicList().get(1), music2);
        assertMemberInfoResponse(response.getMemberInfo(), albumDetailMapping);
    }

    @Test
    @DisplayName("앨범 상세 정보 조회 테스트 - 앨범 정보 없음")
    public void getAlbumDetailNoAlbumTest() {
        // Given
        String albumCode = "album1";
        Long memberId = 1L;
        when(albumRepository.getAlbumByCodeWithDetail(albumCode)).thenReturn(Optional.empty());

        // When
        NoAlbumFoundException exception = assertThrows(NoAlbumFoundException.class, () -> albumService.getAlbumDetail(albumCode, memberId));

        // Then
        assertNotNull(exception);
    }

    @Test
    @DisplayName("앨범 상세 정보 조회 테스트 - 앨범 소유 안함")
    public void getAlbumDetail_NotCollectedAlbum() throws NoAlbumFoundException {
        // given
        String albumCode = "test_album_code";
        Long memberId = 1L;
        AlbumDetailMapping albumDetailMapping = mock(AlbumDetailMapping.class);
        when(albumDetailMapping.getAlbumId()).thenReturn(1L);
        when(albumDetailMapping.getMemberId()).thenReturn(memberId + 1);
        when(albumDetailMapping.getCode()).thenReturn(albumCode);
        when(albumDetailMapping.getName()).thenReturn("Test Album 1");
        when(albumDetailMapping.getAlbumImage()).thenReturn("test_album_image_1");
        when(albumDetailMapping.getReleasedDate()).thenReturn(LocalDateTime.now());
        when(albumDetailMapping.getNickname()).thenReturn("Test Artist 1");
        when(albumDetailMapping.getProfileImage()).thenReturn("test_profile_image_1");
        when(albumDetailMapping.getEmail()).thenReturn("test@example.com");

        when(albumRepository.getAlbumByCodeWithDetail(albumCode)).thenReturn(Optional.of(albumDetailMapping));

        Music music1 = new Music(1L, 1L, "Test Music 1", "Test Artist 1", 300, "music1.m3u8", "music1", 1, true);
        Music music2 = new Music(2L, 1L, "Test Music 2", "Test Artist 1", 300, "music2.m3u8", "music2", 2, false);

        List<Music> musicList = Arrays.asList(music1, music2);
        when(musicRepository.getAllByAlbumIdOrderByMusicIndex(albumDetailMapping.getAlbumId())).thenReturn(musicList);

        when(userCollectAlbumRepository.findByMemberIdAndAlbumId(memberId, albumDetailMapping.getAlbumId())).thenReturn(Optional.empty());

        // when
        AlbumDetailResponse response = albumService.getAlbumDetail(albumCode, memberId);

        // then
        assertEquals(AlbumStatus.NOT_COLLECTED, response.getAlbumStatus());
        assertMemberInfoResponse(response.getMemberInfo(), albumDetailMapping);
        assertMusicResponse(response.getMusicList().get(0), musicList.get(0));
        assertMusicResponse(response.getMusicList().get(1), musicList.get(1));
    }

    @Test
    @DisplayName("앨범 상세 정보 조회 테스트 - 앨범 소유 함")
    public void getAlbumDetail_CollectedAlbum() throws NoAlbumFoundException {
        // given
        String albumCode = "test_album_code";
        Long memberId = 1L;
        AlbumDetailMapping albumDetailMapping = mock(AlbumDetailMapping.class);
        when(albumDetailMapping.getAlbumId()).thenReturn(1L);
        when(albumDetailMapping.getMemberId()).thenReturn(memberId + 1);
        when(albumDetailMapping.getCode()).thenReturn(albumCode);
        when(albumDetailMapping.getName()).thenReturn("Test Album 1");
        when(albumDetailMapping.getAlbumImage()).thenReturn("test_album_image_1");
        when(albumDetailMapping.getReleasedDate()).thenReturn(LocalDateTime.now());
        when(albumDetailMapping.getNickname()).thenReturn("Test Artist 1");
        when(albumDetailMapping.getProfileImage()).thenReturn("test_profile_image_1");
        when(albumDetailMapping.getEmail()).thenReturn("test@example.com");

        when(albumRepository.getAlbumByCodeWithDetail(albumCode)).thenReturn(Optional.of(albumDetailMapping));

        Music music1 = new Music(1L, 1L, "Test Music 1", "Test Artist 1", 300, "music1.m3u8", "music1", 1, true);
        Music music2 = new Music(2L, 1L, "Test Music 2", "Test Artist 1", 300, "music2.m3u8", "music2", 2, false);

        List<Music> musicList = Arrays.asList(music1, music2);
        when(musicRepository.getAllByAlbumIdOrderByMusicIndex(albumDetailMapping.getAlbumId())).thenReturn(musicList);

        UserCollectAlbum userCollectAlbum = new UserCollectAlbum(1L, 1L, 1L, LocalDateTime.of(2023, 05, 01, 01, 00, 00));
        when(userCollectAlbumRepository.findByMemberIdAndAlbumId(memberId, albumDetailMapping.getAlbumId())).thenReturn(Optional.of(userCollectAlbum));

        // when
        AlbumDetailResponse response = albumService.getAlbumDetail(albumCode, memberId);

        // then
        assertEquals(AlbumStatus.COLLECTED, response.getAlbumStatus());
        assertMemberInfoResponse(response.getMemberInfo(), albumDetailMapping);
        assertMusicResponse(response.getMusicList().get(0), musicList.get(0));
        assertMusicResponse(response.getMusicList().get(1), musicList.get(1));
    }

    private void assertMusicResponse(MusicResponse musicResponse, Music music) {
        assertEquals(music.getCode(), musicResponse.getCode());
        assertEquals(music.getName(), musicResponse.getName());
        assertEquals(music.getArtistName(), musicResponse.getArtistName());
        assertEquals(music.getPlaytime(), musicResponse.getPlaytime());
        assertEquals(music.getMusicIndex(), musicResponse.getMusicIndex());
        assertEquals(music.getIsTitle(), musicResponse.getIsTitle());
    }

    private void assertMemberInfoResponse(MemberInfoResponse memberInfoResponse, AlbumDetailMapping albumDetailMapping) {
        assertEquals(albumDetailMapping.getNickname(), memberInfoResponse.getNickname());
        assertEquals(albumDetailMapping.getProfileImage(), memberInfoResponse.getProfileImage());
        assertEquals(albumDetailMapping.getEmail(), memberInfoResponse.getEmail());
    }

    @Test
    @DisplayName("앨범 아이디로 코드 불러오, 성공")
    public void getCodeByAlbumId_ValidAlbumId() throws NoAlbumFoundException {
        // given
        Long albumId = 1L;
        String expectedCode = "test_album_code";
        when(albumRepository.getCodeByAlbumId(albumId)).thenReturn(Optional.of(expectedCode));

        // when
        String actualCode = albumService.getCodeByAlbumId(albumId);

        // then
        assertEquals(expectedCode, actualCode);
    }

    @Test
    @DisplayName("앨범 아이디로 코드 불러오, 실패")
    public void getCodeByAlbumId_InvalidAlbumId() {
        // given
        Long albumId = -1L;
        when(albumRepository.getCodeByAlbumId(albumId)).thenReturn(Optional.empty());

        // when
        NoAlbumFoundException exception = assertThrows(NoAlbumFoundException.class, () -> albumService.getCodeByAlbumId(albumId));

        // then
        assertNotNull(exception);
    }


}
