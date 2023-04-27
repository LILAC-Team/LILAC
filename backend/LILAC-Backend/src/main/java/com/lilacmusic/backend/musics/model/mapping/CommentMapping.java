package com.lilacmusic.backend.musics.model.mapping;

import java.time.LocalDateTime;

public interface CommentMapping {
    String getCode();

    String getContent();

    Integer getPresentTime();

    LocalDateTime getCreatedTime();

    String getNickname();

    String getProfileImage();

}
