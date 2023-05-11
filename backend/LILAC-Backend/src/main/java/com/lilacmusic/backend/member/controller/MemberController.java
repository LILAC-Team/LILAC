package com.lilacmusic.backend.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.global.common.BaseResponse;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.member.request.DuplicateNicknameRequest;
import com.lilacmusic.backend.member.request.MemberSignUpRequest;
import com.lilacmusic.backend.member.request.ReGenerateAccessTokenRequest;
import com.lilacmusic.backend.member.response.MemberDetailResponse;
import com.lilacmusic.backend.member.response.MemberSignUpResponse;
import com.lilacmusic.backend.member.response.ReGenerateAccessTokenResponse;
import com.lilacmusic.backend.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@Api(tags = "Member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    private final GlobalRequestValidator validator;

    @GetMapping("/test")
    @Operation(description = "임시 테스트용 API", summary = "임시 테스트용 API")
    public String test() {
        return "ok";
    }

    @PostMapping("/api/v1/refresh")
    @Operation(description = "액세스 재발급 API", summary = "액세스 토큰 재발급 API")
    @ApiResponse(responseCode = "200", description = "재발급 성공", content = @Content(schema = @Schema(implementation = ReGenerateAccessTokenResponse.class)))
    public BaseResponse<ReGenerateAccessTokenResponse> reGenerateAccessToken(@Valid @RequestBody ReGenerateAccessTokenRequest request) {

        ReGenerateAccessTokenResponse regenerateAccessTokenResponse = memberService.regenerateAccessToken(request.getRefreshToken());
        return new BaseResponse<>(regenerateAccessTokenResponse);
    }

    @ApiResponse(responseCode = "200", description = "회원가입 성공", content = @Content(schema = @Schema(implementation = MemberSignUpResponse.class)))
    @Operation(description = "회원 가입 API", summary = "회원가입 API")
    @PostMapping("/api/v1/members")
    public BaseResponse<MemberSignUpResponse> signup(@RequestPart("memberInfo") String memberInfoJson,  @RequestPart(value = "profileImage", required = false) MultipartFile profileImageFile) throws JsonProcessingException {
        MemberSignUpRequest request = new ObjectMapper().readValue(memberInfoJson, MemberSignUpRequest.class);

        if (profileImageFile != null) {
            String profileImageUrl = memberService.uploadProfileImage(profileImageFile);
            request.setProfileImage(profileImageUrl);
        }

        MemberSignUpResponse signup = memberService.signup(request);
        return new BaseResponse<>(signup);
    }

    @ApiResponse(responseCode = "200", description = "회원정보 조회 성공", content = @Content(schema = @Schema(implementation = MemberDetailResponse.class)))
    @Operation(description = "회원정보 조회 API", summary = "회원정보 조회 API")
    @GetMapping("/api/v1/members")
    public BaseResponse<MemberDetailResponse> memberInfo(HttpServletRequest request) throws JsonProcessingException {

        Long memberId = validator.validateEmail(request);

        MemberDetailResponse memberDetail = memberService.memberDetail(memberId);
        return new BaseResponse<>(memberDetail);
    }

}
