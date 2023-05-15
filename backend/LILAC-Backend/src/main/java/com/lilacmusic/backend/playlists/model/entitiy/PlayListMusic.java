package com.lilacmusic.backend.playlists.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayListMusic {
    @Size(min = 1, max = 50)
    private String name;

    @Size(min = 1, max = 50)
    private String artistName;

    @Positive
    private Integer playtime;

    @Size(max = 100)
    private String code;

    @Size(max = 100)
    private String albumImage;
}
