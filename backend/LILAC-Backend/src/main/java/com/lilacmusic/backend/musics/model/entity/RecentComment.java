package com.lilacmusic.backend.musics.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
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
    private Long recentCommentId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "music_id", nullable = false)
    private Long musicId;

    @Column(name = "content", nullable = false, length = 100)
    private String content;

    @Column(name = "present_time", nullable = false)
    private Integer presentTime;
}
