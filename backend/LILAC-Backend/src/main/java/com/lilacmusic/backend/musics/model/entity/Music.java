package com.lilacmusic.backend.musics.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "music")
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_id", unique = true, nullable = false)
    private Long musicId;


    @Column(name = "album_id", nullable = false)
    private Long albumId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "artist_name", nullable = false, length = 50)
    private String artistName;

    @Column(name = "playtime", nullable = false)
    private Integer playtime;

    @Column(name = "storage_path", nullable = false, length = 100)
    private String storagePath;

    @Column(name = "code", nullable = false, length = 100, unique = true)
    private String code;

    @Column(name = "index", nullable = false)
    private Integer index;

    @Column(name = "is_title", nullable = false)
    private Boolean isTitle = false;
}
