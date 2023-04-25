package com.lilacmusic.backend.albums.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlbumResponse {
    private String name;
    private String albumImage;
    private String code;
    private LocalDateTime releasedDate;
    private String nickname;

}
