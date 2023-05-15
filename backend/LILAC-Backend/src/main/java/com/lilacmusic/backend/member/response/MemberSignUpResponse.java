package com.lilacmusic.backend.member.response;

import com.lilacmusic.backend.member.entity.Member.RegistrationId;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.*;

@Getter
@AllArgsConstructor
@Schema(description = "가입 요청 응답")
public class MemberSignUpResponse {

    @Schema(description = "이메일")
    private String email;
    @Schema(description = "프로필 사진")
    private String profileImage;
    @Schema(description = "닉네임")
    private String nickname;
    @Schema(description = "액세스 토큰")
    private String accessToken;
    @Schema(description = "리프레시 토큰")
    private String refreshToken;

}
