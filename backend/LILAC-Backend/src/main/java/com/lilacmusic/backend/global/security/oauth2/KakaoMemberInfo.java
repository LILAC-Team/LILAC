package com.lilacmusic.backend.global.security.oauth2;


import com.lilacmusic.backend.member.entity.Member.RegistrationId;

import java.util.Map;
/**
 * @author skyland310
 * 카카오 로그인 정보를 담을 클래스
 */
public class KakaoMemberInfo implements MemberInfo {
    private final Map<String, Object> attributes;

    public KakaoMemberInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }


    @Override
    public String getEmail() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        if (account == null) {
            return null;
        }
        return account.get("email").toString();
    }

    @Override
    public RegistrationId getRegistrationId() {
        return RegistrationId.kakao;
    }


    @Override
    public String getNickname() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) account.get("profile");

        if (account == null || profile == null) {
            return null;
        }

        return (String) profile.get("nickname");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) account.get("profile");

        if (account == null || profile == null) {
            return null;
        }

        return (String) profile.get("thumbnail_image_url");
    }



}
