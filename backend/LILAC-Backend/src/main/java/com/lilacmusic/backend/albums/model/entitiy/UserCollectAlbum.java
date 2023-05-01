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
public class UserCollectAlbum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_collect_album_id", unique = true, nullable = false)
    @Comment("소장앨범 관계 PK")
    private Long userCollectAlbumId;

    @Column(name = "member_id", nullable = false)
    @Comment("소장한 유저 PK")
    private Long memberId;

    @Column(name = "album_id", nullable = false)
    @Comment("소장된 앨범 PK")
    private Long albumId;

    @CreatedDate
    @Column(name = "created_time", nullable = false)
    @Comment("소장 시각")
    private LocalDateTime createdTime;

}
