package com.lilacmusic.backend.playlists.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayListMusic {
    private String name;

    private String artistName;

    private Integer playtime;

    private String code;

    private String albumImage;
}
