package com.lilacmusic.backend.albums.model.mapping;

import java.time.LocalDateTime;

public interface AlbumMapping {
    String getCode();

    String getName();

    String getAlbumImage();

    LocalDateTime getReleasedDate();

    String getNickname();

}
