package com.lilacmusic.backend.albums.model.repository;

import com.lilacmusic.backend.albums.model.entitiy.UserCollectAlbum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCollectAlbumRepository extends JpaRepository<UserCollectAlbum, Long> {
    Optional<UserCollectAlbum> findByUserIdAndAlbumId(Long userId, Long albumId);
}
