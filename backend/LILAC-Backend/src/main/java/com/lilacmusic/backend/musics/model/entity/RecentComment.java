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
@Table(name = "recent_comment")
public class RecentComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recent_comment_id", nullable = false, unique = true)
    @org.hibernate.annotations.Comment("최신 댓글 PK")
    private Long recentCommentId;

    @Column(name = "member_id", nullable = false)
    @org.hibernate.annotations.Comment("최신 댓글 단 유저 PK")
    private Long memberId;

    @Column(name = "music_id", nullable = false)
    @org.hibernate.annotations.Comment("최신 댓글 달린 음원 PK")
    private Long musicId;

    @Column(name = "content", nullable = false, length = 100)
    @org.hibernate.annotations.Comment("최신 댓글 내용")
    private String content;

    @Column(name = "present_time", nullable = false)
    @org.hibernate.annotations.Comment("최신 댓글 달린 음원 시각 - 초 단위")
    private Integer presentTime;
}
