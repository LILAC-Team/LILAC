package com.lilacmusic.backend.albums.model.repository;

import com.lilacmusic.backend.albums.model.entitiy.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query(value = "SELECT a.code, a.name, a.albumImage, a.releasedDate, u.nickname FROM Album a INNER JOIN User u ON a.userId = u.userId WHERE a.userId = ?1")
    Page<Object[]> getAlbumsByUserId(Long userId, Pageable pageable);

    @Query(value = "SELECT a.code, a.name, a.albumImage, a.releasedDate, u.nickname FROM UserCollectAlbum ua INNER JOIN Album a ON ua.albumId = a.albumId INNER JOIN User u ON a.userId = u.userId WHERE ua.userId = ?1")
    Page<Object[]> getAlbumsByUserCollectAlbums(Long userId, Pageable pageable);
}
