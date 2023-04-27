package com.lilacmusic.backend.musics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MusicDetailResponse {

    private String name;

    private String artistName;

    private Integer playtime;

    private String storagePath;

    private String code;

    private String albumImage;

    List<RecentCommentResponse> recentCommentList;

}
