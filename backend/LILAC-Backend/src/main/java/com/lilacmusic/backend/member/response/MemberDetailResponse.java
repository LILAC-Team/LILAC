package com.lilacmusic.backend.member.response;

import io.swagger.models.auth.In;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

@Getter
@AllArgsConstructor
@Schema(description = "회원 정보 응답")
public class MemberDetailResponse {

    @Schema(description = "이메일")
    private String email;
    @Schema(description = "프로필 사진")
    private String profileImage;
    @Schema(description = "닉네임")
    private String nickname;
    @Schema(description = "발매 앨범 수")
    private Integer releaseAlbumCount;
    @Schema(description = "소장 앨범 수")
    private Integer collectAlbumCount;

}
