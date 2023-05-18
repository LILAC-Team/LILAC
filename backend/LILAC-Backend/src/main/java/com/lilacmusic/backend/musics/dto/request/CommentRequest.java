package com.lilacmusic.backend.musics.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequest {
    @Size(max = 100)
    private String content;
    @PositiveOrZero
    private Integer presentTime;
}
