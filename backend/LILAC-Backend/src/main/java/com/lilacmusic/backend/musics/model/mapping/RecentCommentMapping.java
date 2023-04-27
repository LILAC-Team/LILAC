package com.lilacmusic.backend.musics.model.mapping;

import java.time.LocalDateTime;

public interface RecentCommentMapping {
    String getContent();

    Integer getPresentTime();

    String getNickname();

    String getProfileImage();
}
