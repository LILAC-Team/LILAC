package com.lilacmusic.backend.albums.dto.request;

import com.lilacmusic.backend.musics.dto.request.MusicRequest;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AlbumRequest {
    private List<MusicRequest> musicList;
    private String name;
}
