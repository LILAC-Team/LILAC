package com.lilacmusic.backend.albums.dto.response;

import com.lilacmusic.backend.musics.dto.response.MusicResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlbumDetailResponse {

    private String code;

    private Long userId;

    private String name;

    private String albumImage;

    private LocalDateTime releasedDate;

    private List<MusicResponse> musicList;

    private UserInfoResponse userInfo;
}
