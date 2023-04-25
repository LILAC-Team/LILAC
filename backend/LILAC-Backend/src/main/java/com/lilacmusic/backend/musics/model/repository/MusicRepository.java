package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long> {
}
