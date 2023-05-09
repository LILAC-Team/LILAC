package com.lilacmusic.backend.albums.dto.request;

import com.lilacmusic.backend.musics.dto.request.MusicRequest;
import lombok.*;

import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AlbumRequest {
    private List<MusicRequest> musicList;
    @Size(max = 50, min = 1)
    private String name;
}
