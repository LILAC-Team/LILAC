package com.lilacmusic.backend.users.model.entity;

import com.lilacmusic.backend.users.model.enums.Role;
import com.lilacmusic.backend.users.model.enums.SocialType;
import lombok.*;
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

    @Column(name = "oauth2_id", unique = true, nullable = false)
    private String oAuth2Id;

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

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO, NAVER, GOOGLE

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)

    private String refreshToken; // 리프레시 토큰


    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
    }


}

