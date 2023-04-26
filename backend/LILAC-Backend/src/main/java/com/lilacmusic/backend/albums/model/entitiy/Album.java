package com.lilacmusic.backend.albums.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "album")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "album_id", unique = true, nullable = false)
    @Comment("앨범 PK")
    private Long albumId;

    @Column(name = "code", length = 100, nullable = false, unique = true)
    @Comment("앨범 고유 코드 - UUID")
    private String code;

    @Column(name = "user_id",nullable = false)
    @Comment("앨범 발매자 PK")
    private Long userId;

    @Column(name = "name", length = 50, nullable = false)
    @Comment("앨범 제목")
    private String name;


    @Column(name = "album_image", length = 100, nullable = false)
    @Comment("앨범 커버 사진 URL")
    private String albumImage;

    @CreatedDate
    @Column(name = "released_date", nullable = false)
    @Comment("앨범 발매일자")
    private LocalDateTime releasedDate;

}