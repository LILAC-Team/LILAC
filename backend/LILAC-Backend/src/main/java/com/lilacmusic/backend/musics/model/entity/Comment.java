package com.lilacmusic.backend.musics.model.entity;

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
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false, unique = true)
    private Long commentId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "music_id", nullable = false)
    private Long musicId;

    @Column(name = "code", nullable = false, length = 100)
    private String code;

    @Column(name = "content", nullable = false, length = 100)
    private String content;

    @Column(name = "present_time", nullable = false)
    private Integer presentTime;

    @CreatedDate
    @Column(name = "created_time", nullable = false)
    private LocalDateTime createdTime;
}
