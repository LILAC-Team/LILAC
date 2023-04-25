package com.lilacmusic.backend.users.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", length = 50, nullable = false, unique = true)
    private Long userId;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "nickname", length = 50, nullable = false)
    private String nickname;

    @Column(name = "profile_image", length = 100, nullable = true)
    private String profileImage;

    @Column(name = "release_album_count", nullable = false)
    private Integer releaseAlbumCount;

    @Column(name = "collect_album_count", nullable = false)
    private Integer collectAlbumCount;

    @CreatedDate
    @Column(name = "created_time", nullable = false)
    private LocalDateTime createdTime;

    @LastModifiedDate
    @Column(name = "modified_time", nullable = false)
    private LocalDateTime modifiedTime;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

}
