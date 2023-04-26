package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Long> {

    Optional<Music> findByCode(String code);

    @Query("SELECT m.musicId FROM Music m WHERE m.code = ?1")
    Optional<Long> findMusicIdByCode(String code);

    @Query("SELECT m.musicId, m.code, m.name, m.artistName, m.playtime, m.storagePath, a.albumImage FROM Music m INNER JOIN Album a ON m.albumId = a.albumId WHERE m.code = ?1")
    Optional<Object[]> findByCodeWithAlbumImage(String code);

    List<Music> getAllByAlbumIdOrderByMusicIndex(Long albumId);
}
