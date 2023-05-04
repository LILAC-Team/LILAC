package com.lilacmusic.backend.musics.dto.request;


import lombok.*;

import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequest {
    @Size(max = 100)
    private String content;
    @Positive
    private Integer presentTime;
}
