package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.response.AlbumResponse;
import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService{
    private static final int PAGE_SIZE = 6;

    private final AlbumRepository albumRepository;

    @Override
    public ReleasedAlbumListResponse getReleasedAlbums(Integer pageNumber, Long userId) {
        Page<Album> albumPage = albumRepository.getAlbumsByUserId(userId,
                PageRequest.of(pageNumber-1, PAGE_SIZE, Sort.Direction.DESC, "releasedDate"));
        Page<AlbumResponse> albumResponsePage = albumPage.map(album -> new AlbumResponse(album.getName(),
                album.getAlbumImage(), album.getCode()));
        ReleasedAlbumListResponse response = ReleasedAlbumListResponse.builder()
                .releasedAlbumList(albumResponsePage.getContent())
                .number(albumResponsePage.getNumber()+1)
                .totalPages(albumResponsePage.getTotalPages())
                .totalElements(albumResponsePage.getTotalElements())
                .first(albumResponsePage.isFirst())
                .last(albumResponsePage.isLast())
                .build();
        return response;
    }

    @Override
    public CollectedAlbumListResponse getCollectedAlbums(Integer pageNumber, Long userId) {
        Page<Album> albumPage = albumRepository.getAlbumsByUserCollectAlbums(userId,
                PageRequest.of(pageNumber-1, PAGE_SIZE, Sort.Direction.DESC, "createdTime"));
        Page<AlbumResponse> albumResponsePage = albumPage.map(album -> new AlbumResponse(album.getName(),
                album.getAlbumImage(), album.getCode()));
        CollectedAlbumListResponse response = CollectedAlbumListResponse.builder()
                .collectedAlbumList(albumResponsePage.getContent())
                .number(albumResponsePage.getNumber()+1)
                .totalPages(albumResponsePage.getTotalPages())
                .totalElements(albumResponsePage.getTotalElements())
                .first(albumResponsePage.isFirst())
                .last(albumResponsePage.isLast())
                .build();
        return response;
    }
}
