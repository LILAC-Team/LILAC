package com.lilacmusic.backend.member.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "로그아웃 응답")
public class MemberLogoutResponse {

    @Schema(description = "로그아웃 성공 여부")
    private Boolean isLogout;

}
