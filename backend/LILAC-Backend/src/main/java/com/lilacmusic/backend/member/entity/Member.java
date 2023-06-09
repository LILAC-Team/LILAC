package com.lilacmusic.backend.member.entity;

import com.lilacmusic.backend.global.common.BaseTime;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "member")
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "nickname", length = 50, nullable = false)
    private String nickname;

    @Column(name = "profile_image", length = 100, nullable = true)
    private String profileImage;

    @Column(name = "release_album_count", nullable = false, columnDefinition = "integer default 0")
    private Integer releaseAlbumCount;

    @Column(name = "collect_album_count", nullable = false, columnDefinition = "integer default 0")
    private Integer collectAlbumCount;

//    @CreatedDate
//    @Column(name = "created_time", nullable = false)
//    private LocalDateTime createdTime;
//
//    @LastModifiedDate
//    @Column(name = "modified_time", nullable = false)
//    private LocalDateTime modifiedTime;

    @Column(name = "is_active", nullable = false, columnDefinition = "boolean default true")
    private Boolean isActive;

    @Builder
    public Member(Long memberId, String email, String nickname, RegistrationId registrationId, String profileImage) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.registrationId = registrationId;
        this.profileImage = profileImage;
        this.releaseAlbumCount = 0;
        this.collectAlbumCount = 0;
        this.isActive = true;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "registration_id")
    private RegistrationId registrationId;

    public Member(String email, String nickname, RegistrationId registrationId, String profileImage) {
        this.email = email;
        this.nickname = nickname;
        this.registrationId = registrationId;
        this.profileImage = profileImage;
        this.releaseAlbumCount = 0;
        this.collectAlbumCount = 0;
        this.isActive = true;
    }

    public enum RegistrationId {
        kakao

    }

    public void updateProfileImageAndNickname(String profileImage, String nickname) {
        this.profileImage = profileImage;
        this.nickname = nickname;
    }

}