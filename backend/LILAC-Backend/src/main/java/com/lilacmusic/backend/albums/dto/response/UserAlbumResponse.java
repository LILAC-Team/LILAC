package com.lilacmusic.backend.albums.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAlbumResponse {

    private String email;

    private String nickname;

    private String profileImage;
}
