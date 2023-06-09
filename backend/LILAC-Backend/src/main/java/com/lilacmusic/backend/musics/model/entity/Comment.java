package com.lilacmusic.backend.musics.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "comment", indexes = {
        @Index(name = "idx__music_id", columnList = "music_id"),
        @Index(name = "idx__member_id", columnList = "member_id")
})
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false, unique = true)
    @org.hibernate.annotations.Comment("댓글 PK")
    private Long commentId;

    @Column(name = "member_id", nullable = false)
    @org.hibernate.annotations.Comment("댓글 단 유저 PK")
    private Long memberId;

    @Column(name = "music_id", nullable = false)
    @org.hibernate.annotations.Comment("댓글이 달린 음원 PK")
    private Long musicId;

    @Column(name = "code", nullable = false, length = 100, unique = true)
    @org.hibernate.annotations.Comment("댓글 고유 코드 - UUID")
    private String code;

    @Column(name = "content", nullable = false, length = 100)
    @org.hibernate.annotations.Comment("댓글 내용")
    private String content;

    @Column(name = "present_time", nullable = false)
    @org.hibernate.annotations.Comment("댓글이 달린 음원의 시각 - 초 단위")
    private Integer presentTime;

    @CreatedDate
    @Column(name = "created_time", nullable = false)
    @org.hibernate.annotations.Comment("댓글 달린 시각")
    private LocalDateTime createdTime;
}
