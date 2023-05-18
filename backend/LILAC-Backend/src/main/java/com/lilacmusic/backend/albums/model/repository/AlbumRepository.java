package com.lilacmusic.backend.albums.model.repository;

import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.model.mapping.AlbumDetailMapping;
import com.lilacmusic.backend.albums.model.mapping.AlbumMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query(value = "SELECT a.code AS code, a.name AS name, a.albumImage AS albumImage, a.releasedDate AS releasedDate, u.nickname AS nickname FROM Album a INNER JOIN Member u ON a.memberId = u.memberId WHERE a.memberId = ?1")
    Page<AlbumMapping> getAlbumsByMemberId(Long memberId, Pageable pageable);

    @Query(value = "SELECT a.code AS code, a.name AS name, a.albumImage AS albumImage, a.releasedDate AS releasedDate, u.nickname AS nickname FROM Album a INNER JOIN Member u ON a.memberId = u.memberId WHERE a.memberId = ?1 ORDER BY a.releasedDate DESC")
    List<AlbumMapping> getAllAlbumsByMemberId(Long memberId);

    @Query(value = "SELECT a.code AS code, a.name AS name, a.albumImage AS albumImage, a.releasedDate AS releasedDate, u.nickname AS nickname FROM UserCollectAlbum ua INNER JOIN Album a ON ua.albumId = a.albumId INNER JOIN Member u ON a.memberId = u.memberId WHERE ua.memberId = ?1")
    Page<AlbumMapping> getAlbumsByUserCollectAlbums(Long memberId, Pageable pageable);

    @Query(value = "SELECT a.code AS code, a.name AS name, a.albumImage AS albumImage, a.releasedDate AS releasedDate, u.nickname AS nickname FROM UserCollectAlbum ua INNER JOIN Album a ON ua.albumId = a.albumId INNER JOIN Member u ON a.memberId = u.memberId WHERE ua.memberId = ?1 ORDER BY ua.createdTime DESC")
    List<AlbumMapping> getAllAlbumsByUserCollectAlbums(Long memberId);

    Optional<Album> getAlbumByCode(String code);

    @Query(value = "SELECT a.albumId AS albumId, a.memberId AS memberId, a.code AS code, a.name AS name, a.albumImage AS albumImage, a.releasedDate AS releasedDate, u.nickname AS nickname, u.profileImage AS profileImage, u.email AS email FROM Album a INNER JOIN Member u ON a.memberId = u.memberId WHERE a.code = ?1")
    Optional<AlbumDetailMapping> getAlbumByCodeWithDetail(String code);

    @Query(value = "SELECT a.code FROM Album a WHERE a.albumId = ?1")
    Optional<String> getCodeByAlbumId(Long albumId);
}
