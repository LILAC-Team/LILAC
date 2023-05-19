package com.lilacmusic.backend.albums.dto.response;

import com.lilacmusic.backend.musics.dto.response.MusicResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlbumDetailResponse {

    private String code;

    private AlbumStatus albumStatus;

    private String name;

    private String albumImage;

    private LocalDateTime releasedDate;

    private List<MusicResponse> musicList;

    private MemberInfoResponse memberInfo;

}
