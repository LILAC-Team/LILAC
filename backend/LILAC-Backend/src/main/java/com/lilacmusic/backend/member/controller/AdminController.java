package com.lilacmusic.backend.member.controller;

import com.lilacmusic.backend.global.common.BaseResponse;
import com.lilacmusic.backend.member.request.LoginInfo;
import com.lilacmusic.backend.member.service.MemberService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "admin", description = "Admin API")
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {

    private final MemberService memberService;

    @PostMapping("/login/admin")
    @ApiResponse(responseCode = "200", description = "로그인 성공")
    @ApiResponse(responseCode = "401", description = "아이디나 비밀번호 정보가 틀렸습니다.")
    public BaseResponse<Object> login(@RequestBody LoginInfo loginInfo) {
        String tokens = memberService.adminLogin(loginInfo);
        return new BaseResponse<>(tokens);
    }


}
