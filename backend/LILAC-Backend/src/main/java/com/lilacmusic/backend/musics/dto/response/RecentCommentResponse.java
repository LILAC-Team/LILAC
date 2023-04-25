package com.lilacmusic.backend.musics.dto.response;

import com.lilacmusic.backend.albums.dto.response.UserInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentCommentResponse {
    private String code;

    private String content;

    private Integer presentTime;

    private LocalDateTime createdTime;

    private UserInfoResponse userInfo;
}
