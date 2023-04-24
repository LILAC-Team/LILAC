package com.lilacmusic.backend.albums.model.repository;

import com.lilacmusic.backend.albums.model.entitiy.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    Page<Album> getAlbumsByUserId(Long userId, Pageable pageable);

    @Query(value = "SELECT a FROM UserCollectAlbum ua INNER JOIN Album a ON ua.albumId = a.albumId WHERE ua.userId = ?1")
    Page<Album> getAlbumsByUserCollectAlbums(Long userId, Pageable pageable);
}
