package com.lilacmusic.backend.musics.dto.request;

import lombok.*;

import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MusicRequest {
    @Size(min = 1, max = 50)
    private String name;
    @Size(min = 1, max = 50)
    private String artistName;
    @Positive
    private Integer musicIndex;
    private Boolean isTitle;
    @Positive
    private Integer playtime;
}
