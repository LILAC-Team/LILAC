package com.lilacmusic.backend.musics.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "music", indexes = @Index(name = "idx__album_id", columnList = "album_id"))
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_id", unique = true, nullable = false)
    @org.hibernate.annotations.Comment("음원 PK")
    private Long musicId;

    @Column(name = "album_id", nullable = false)
    @org.hibernate.annotations.Comment("음원이 소속된 앨범 PK")
    private Long albumId;

    @Column(name = "name", nullable = false, length = 50)
    @org.hibernate.annotations.Comment("음원 제목")
    private String name;

    @Column(name = "artist_name", nullable = false, length = 50)
    @org.hibernate.annotations.Comment("음원 발매자 이름")
    private String artistName;

    @Column(name = "playtime", nullable = false)
    @org.hibernate.annotations.Comment("음원 길이 - 초 단위")
    private Integer playtime;

    @Column(name = "storage_path", nullable = false, length = 100)
    @org.hibernate.annotations.Comment("음원 클라우드 경로 URL")
    private String storagePath;

    @Column(name = "code", nullable = false, length = 100, unique = true)
    @org.hibernate.annotations.Comment("음원 고유 코드 - UUID")
    private String code;

    @Column(name = "music_index", nullable = false)
    @org.hibernate.annotations.Comment("음원의 앨범 속 순서")
    private Integer musicIndex;

    @Column(name = "is_title", nullable = false)
    @org.hibernate.annotations.Comment("음원 타이틀곡 여부")
    private Boolean isTitle = false;
}
