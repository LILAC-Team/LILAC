package com.lilacmusic.backend.musics.dto.response;

import com.lilacmusic.backend.albums.dto.response.MemberInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentCommentResponse {

    private String content;

    private Integer presentTime;

    private MemberInfoResponse memberInfo;
}
