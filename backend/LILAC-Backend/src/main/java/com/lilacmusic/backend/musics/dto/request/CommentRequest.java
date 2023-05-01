package com.lilacmusic.backend.musics.dto.request;


import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequest {
    private String content;
    private Integer presentTime;
}
