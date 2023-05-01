package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.mapping.MusicImgMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Long> {

    Optional<Music> findByCode(String code);

    @Query("SELECT m.musicId FROM Music m WHERE m.code = ?1")
    Optional<Long> findMusicIdByCode(String code);

    @Query("SELECT m.musicId AS musicId, m.code AS code, m.name AS name, m.artistName AS artistName, m.playtime AS playtime, m.storagePath AS storagePath, a.albumImage AS albumImage  FROM Music m INNER JOIN Album a ON m.albumId = a.albumId WHERE m.code = ?1")
    Optional<MusicImgMapping> findByCodeWithAlbumImage(String code);

    List<Music> getAllByAlbumIdOrderByMusicIndex(Long albumId);
}
