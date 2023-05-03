package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.response.*;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.model.mapping.AlbumDetailMapping;
import com.lilacmusic.backend.albums.model.mapping.AlbumMapping;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.albums.model.repository.UserCollectAlbumRepository;
import com.lilacmusic.backend.musics.dto.response.MusicResponse;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {
    private static final int PAGE_SIZE = 6;

    private final AlbumRepository albumRepository;

    private final MusicRepository musicRepository;

    private final UserCollectAlbumRepository userCollectAlbumRepository;

    @Override
    public ReleasedAlbumListResponse getReleasedAlbums(Integer pageNumber, Long memberId) {
        Page<AlbumMapping> albumPage = albumRepository.getAlbumsByMemberId(memberId,
                PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "releasedDate"));
        Page<AlbumResponse> albumResponsePage = albumPage.map(album ->
                AlbumResponse.builder()
                        .code(album.getCode())
                        .name(album.getName())
                        .albumImage(album.getAlbumImage())
                        .releasedDate(album.getReleasedDate())
                        .nickname(album.getNickname())
                        .build()
        );

        ReleasedAlbumListResponse response = ReleasedAlbumListResponse.builder()
                .releasedAlbumList(albumResponsePage.getContent())
                .number(albumResponsePage.getNumber() + 1)
                .totalPages(albumResponsePage.getTotalPages())
                .totalElements(albumResponsePage.getTotalElements())
                .first(albumResponsePage.isFirst())
                .last(albumResponsePage.isLast())
                .build();
        return response;
    }

    @Override
    public CollectedAlbumListResponse getCollectedAlbums(Integer pageNumber, Long memberId) {
        Page<AlbumMapping> albumPage = albumRepository.getAlbumsByUserCollectAlbums(memberId,
                PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "createdTime"));
        Page<AlbumResponse> albumResponsePage = albumPage.map(album ->
                AlbumResponse.builder()
                        .code(album.getCode())
                        .name(album.getName())
                        .albumImage(album.getAlbumImage())
                        .releasedDate(album.getReleasedDate())
                        .nickname(album.getNickname())
                        .build()
        );
        CollectedAlbumListResponse response = CollectedAlbumListResponse.builder()
                .collectedAlbumList(albumResponsePage.getContent())
                .number(albumResponsePage.getNumber() + 1)
                .totalPages(albumResponsePage.getTotalPages())
                .totalElements(albumResponsePage.getTotalElements())
                .first(albumResponsePage.isFirst())
                .last(albumResponsePage.isLast())
                .build();
        return response;
    }

    @Override
    public AlbumDetailResponse getAlbumDetail(String albumCode, Long memberId) throws NoAlbumFoundException {
        Optional<AlbumDetailMapping> optionalAlbum = albumRepository.getAlbumByCodeWithDetail(albumCode);
        if (optionalAlbum.isEmpty()) {
            throw new NoAlbumFoundException();
        }

        List<Music> musicList = musicRepository.getAllByAlbumIdOrderByMusicIndex(optionalAlbum.get().getAlbumId());
        List<MusicResponse> musicResponseList = musicList.stream().map(music -> MusicResponse.builder()
                .name(music.getName())
                .artistName(music.getArtistName())
                .playtime(music.getPlaytime())
                .code(music.getCode())
                .musicIndex(music.getMusicIndex())
                .isTitle(music.getIsTitle())
                .build()
        ).collect(Collectors.toList());
        AlbumStatus albumStatus = AlbumStatus.NOT_COLLECTED;
        ;
        if (memberId.equals(optionalAlbum.get().getMemberId())) {
            albumStatus = AlbumStatus.RELEASED;
        } else if (userCollectAlbumRepository.findByMemberIdAndAlbumId(memberId, optionalAlbum.get().getAlbumId()).isPresent()) {
            albumStatus = AlbumStatus.COLLECTED;
        }

        AlbumDetailResponse response = AlbumDetailResponse.builder()
                .albumStatus(albumStatus)
                .musicList(musicResponseList)
                .code(optionalAlbum.get().getCode())
                .name(optionalAlbum.get().getName())
                .albumImage(optionalAlbum.get().getAlbumImage())
                .releasedDate(optionalAlbum.get().getReleasedDate())
                .memberInfo(new MemberInfoResponse(optionalAlbum.get().getNickname(), optionalAlbum.get().getProfileImage(), optionalAlbum.get().getEmail()))
                .build();


        return response;
    }

    @Override
    public String getCodeByAlbumId(Long albumId) throws NoAlbumFoundException {
        Optional<String> code = albumRepository.getCodeByAlbumId(albumId);
        if (code.isEmpty()) {
            throw new NoAlbumFoundException();
        }
        return code.get();
    }
}
