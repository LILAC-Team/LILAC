package com.lilacmusic.backend.musics.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MusicRequest {
    private String name;
    private String artistName;
    private Integer musicIndex;
    private Boolean isTitle;
    private Integer playtime;
}
