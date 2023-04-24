package com.lilacmusic.backend.albums.model.entitiy;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "album")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "album_id", unique = true, nullable = false)
    private Long albumId;

    @Column(name = "code", length = 100, nullable = false, unique = true)
    private String code;

    @Column(name = "user_id",nullable = false)
    private Long userId;

    @Column(name = "name", length = 50, nullable = false)
    private String name;


    @Column(name = "album_image", length = 100, nullable = false)
    private String albumImage;

    @CreatedDate
    @Column(name = "released_date", nullable = false)
    private LocalDateTime releasedDate;

}
