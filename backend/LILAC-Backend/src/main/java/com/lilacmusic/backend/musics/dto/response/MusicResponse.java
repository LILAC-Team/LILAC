package com.lilacmusic.backend.musics.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MusicResponse {

    private String name;

    private String artistName;

    private Integer playtime;

    private String code;

    private Integer musicIndex;

    private Boolean isTitle;
}
