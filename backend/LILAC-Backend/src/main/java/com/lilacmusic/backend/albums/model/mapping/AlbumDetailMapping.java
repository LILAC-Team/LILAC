package com.lilacmusic.backend.albums.model.mapping;

import java.time.LocalDateTime;

public interface AlbumDetailMapping {
    Long getAlbumId();

    Long getMemberId();

    String getCode();

    String getName();

    String getAlbumImage();

    LocalDateTime getReleasedDate();

    String getNickname();

    String getProfileImage();
}
