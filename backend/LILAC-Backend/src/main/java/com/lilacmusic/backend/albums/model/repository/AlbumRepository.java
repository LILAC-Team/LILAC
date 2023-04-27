package com.lilacmusic.backend.albums.model.repository;

import com.lilacmusic.backend.albums.model.entitiy.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query(value = "SELECT a.code, a.name, a.albumImage, a.releasedDate, u.nickname FROM Album a INNER JOIN Member u ON a.memberId = u.memberId WHERE a.memberId = ?1")
    Page<Object[]> getAlbumsByMemberId(Long memberId, Pageable pageable);

    @Query(value = "SELECT a.code, a.name, a.albumImage, a.releasedDate, u.nickname FROM UserCollectAlbum ua INNER JOIN Album a ON ua.albumId = a.albumId INNER JOIN Member u ON a.memberId = u.memberId WHERE ua.memberId = ?1")
    Page<Object[]> getAlbumsByUserCollectAlbums(Long memberId, Pageable pageable);

    Optional<Album> getAlbumByCode(String code);
}
