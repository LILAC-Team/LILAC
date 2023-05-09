package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.model.entitiy.UserCollectAlbum;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.albums.model.repository.UserCollectAlbumRepository;
import com.lilacmusic.backend.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserCollectAlbumServiceTest {

    @InjectMocks
    UserCollectAlbumServiceImpl userCollectAlbumService;

    @Mock
    private UserCollectAlbumRepository userCollectAlbumRepository;

    @Mock
    private AlbumRepository albumRepository;

    @Mock
    private MemberRepository memberRepository;


    @Test
    public void collectAlbum_ValidAlbumCode() throws NoAlbumFoundException {
        // given
        String albumCode = "test_album_code";
        Long memberId = 1L;
        Long albumId = 1L;
        Long expectedUserCollectAlbumId = 100L;

        Album mockAlbum = mock(Album.class);
        when(mockAlbum.getAlbumId()).thenReturn(albumId);

        when(albumRepository.getAlbumByCode(albumCode)).thenReturn(Optional.of(mockAlbum));

        UserCollectAlbum expectedUserCollectAlbum = UserCollectAlbum.builder()
                .userCollectAlbumId(expectedUserCollectAlbumId)
                .albumId(albumId)
                .memberId(memberId)
                .createdTime(LocalDateTime.of(2023, 05, 01, 01, 00, 00))
                .build();

        when(userCollectAlbumRepository.save(any(UserCollectAlbum.class))).thenReturn(expectedUserCollectAlbum);

        // when
        Long userCollectAlbumId = userCollectAlbumService.collectAlbum(albumCode, memberId);

        // then
        assertEquals(expectedUserCollectAlbumId, userCollectAlbumId);
        verify(userCollectAlbumRepository, times(1)).save(any(UserCollectAlbum.class));
        verify(memberRepository, times(1)).updateCollectingByMemberId(memberId);
    }

    @Test
    public void collectAlbum_InvalidAlbumCode() {
        // given
        String albumCode = "invalid_album_code";
        Long memberId = 1L;
        when(albumRepository.getAlbumByCode(albumCode)).thenReturn(Optional.empty());

        // when
        NoAlbumFoundException exception = assertThrows(NoAlbumFoundException.class, () -> userCollectAlbumService.collectAlbum(albumCode, memberId));

        // then
        assertNotNull(exception);
        verify(userCollectAlbumRepository, times(0)).save(any(UserCollectAlbum.class));
        verify(memberRepository, times(0)).updateCollectingByMemberId(memberId);
    }
}
