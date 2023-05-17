package com.lilacmusic.backend.member.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Schema(description = "Logout시 Refresh토큰 만료 처리용")
public class LogoutRequest {

    @NotBlank
    @Schema(description = "리프레시 토큰")
    private String refreshToken;

}