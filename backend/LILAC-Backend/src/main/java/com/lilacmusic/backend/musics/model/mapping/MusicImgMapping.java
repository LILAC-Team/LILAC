package com.lilacmusic.backend.musics.model.mapping;

public interface MusicImgMapping {
    Long getMusicId();

    String getCode();

    String getName();

    String getArtistName();

    Integer getPlaytime();

    String getStoragePath();

    String getAlbumImage();
}
