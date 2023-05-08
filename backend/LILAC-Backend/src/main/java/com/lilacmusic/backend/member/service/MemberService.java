package com.lilacmusic.backend.member.service;

import com.lilacmusic.backend.member.request.LoginInfo;
import com.lilacmusic.backend.member.request.MemberSignUpRequest;
import com.lilacmusic.backend.member.response.MemberSignUpResponse;
import com.lilacmusic.backend.member.response.ReGenerateAccessTokenResponse;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    String adminLogin(LoginInfo loginInfo);

    ReGenerateAccessTokenResponse regenerateAccessToken(String refreshToken);

    MemberSignUpResponse signup(MemberSignUpRequest request);

    Long getMemberIdByEmail(String email);

    Integer updateReleasingByMemberId(Long memberId);

    Integer updateCollectingByMemberId(Long memberId);

    String uploadProfileImage(MultipartFile profileImageFile);


}
