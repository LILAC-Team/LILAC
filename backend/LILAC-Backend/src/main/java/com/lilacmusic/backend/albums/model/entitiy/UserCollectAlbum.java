package com.lilacmusic.backend.albums.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCollectAlbum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_collect_album_id", unique = true, nullable = false)
    private Long userCollectAlbumId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "album_id", nullable = false)
    private Long albumId;

    @CreatedDate
    @Column(name = "created_time", nullable = false)
    private LocalDateTime createdTime;

}
