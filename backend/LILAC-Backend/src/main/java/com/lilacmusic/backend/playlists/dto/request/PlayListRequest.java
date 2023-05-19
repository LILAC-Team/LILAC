package com.lilacmusic.backend.playlists.dto.request;

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
public class PlayListRequest {
    private List<PlayListMusic> musicList;
}
