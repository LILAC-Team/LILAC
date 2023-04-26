package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.response.*;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.albums.model.repository.UserCollectAlbumRepository;
import com.lilacmusic.backend.musics.dto.response.MusicResponse;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.users.model.entity.User;
import com.lilacmusic.backend.users.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
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

    private final UserRepository userRepository;

    private final UserCollectAlbumRepository userCollectAlbumRepository;

    @Override
    public ReleasedAlbumListResponse getReleasedAlbums(Integer pageNumber, Long userId) {
        Page<Object[]> albumPage = albumRepository.getAlbumsByUserId(userId,
                PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "releasedDate"));
        Page<AlbumResponse> albumResponsePage = albumPage.map(album -> {
            log.debug(Arrays.toString(album));
            return AlbumResponse.builder()
                    .code((String) album[0])
                    .name((String) album[1])
                    .albumImage((String) album[2])
                    .releasedDate((LocalDateTime) album[3])
                    .nickname((String) album[4])
                    .build();
        });

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
    public CollectedAlbumListResponse getCollectedAlbums(Integer pageNumber, Long userId) {
        Page<Object[]> albumPage = albumRepository.getAlbumsByUserCollectAlbums(userId,
                PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "createdTime"));
        Page<AlbumResponse> albumResponsePage = albumPage.map(album -> AlbumResponse.builder()
                .code((String) album[0])
                .name((String) album[1])
                .albumImage((String) album[2])
                .releasedDate((LocalDateTime) album[3])
                .nickname((String) album[4])
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
    public AlbumDetailResponse getAlbumDetail(String albumCode, Long userId) throws NoAlbumFoundException {
        Optional<Album> optionalAlbum = albumRepository.getAlbumByCode(albumCode);
        if (optionalAlbum.isEmpty()) {
            throw new NoAlbumFoundException();
        }
        Album album = optionalAlbum.get();
        List<Music> musicList = musicRepository.getAllByAlbumIdOrderByMusicIndex(album.getAlbumId());
        List<MusicResponse> musicResponseList = musicList.stream().map(music -> MusicResponse.builder()
                .name(music.getName())
                .artistName(music.getArtistName())
                .playtime(music.getPlaytime())
                .code(music.getCode())
                .musicIndex(music.getMusicIndex())
                .isTitle(music.getIsTitle())
                .build()
        ).collect(Collectors.toList());
        User singer = userRepository.getReferenceById(album.getUserId());
        AlbumStatus albumStatus = AlbumStatus.NOT_COLLECTED;
        ;
        if (userId.equals(album.getUserId())) {
            albumStatus = AlbumStatus.RELEASED;
        } else if (userCollectAlbumRepository.findByUserIdAndAlbumId(userId, album.getAlbumId()).isPresent()) {
            albumStatus = AlbumStatus.COLLECTED;
        }

        AlbumDetailResponse response = AlbumDetailResponse.builder()
                .albumStatus(albumStatus)
                .musicList(musicResponseList)
                .code(album.getCode())
                .name(album.getName())
                .albumImage(album.getAlbumImage())
                .releasedDate(album.getReleasedDate())
                .userInfo(new UserInfoResponse(singer.getNickname(), singer.getProfileImage()))
                .build();


        return response;
    }
}
