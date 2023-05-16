package com.lilacmusic.backend.playlists.dto.response;

import com.lilacmusic.backend.playlists.model.entitiy.PlayListMusic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayListResponse {
    private List<PlayListMusic> musicList;
    private Integer listSize;
}
