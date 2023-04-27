package com.lilacmusic.backend.global.security.oauth2;


import com.lilacmusic.backend.member.entity.Member.RegistrationId;

/**
 * @author suker80
 * 구글 로그인 정보를 담을 클래스
 */
public class GoogleMemberInfo implements MemberInfo {
    private final String email;

    public GoogleMemberInfo(String email) {
        this.email = email;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public RegistrationId getRegistrationId() {
        return RegistrationId.google;
    }
}
