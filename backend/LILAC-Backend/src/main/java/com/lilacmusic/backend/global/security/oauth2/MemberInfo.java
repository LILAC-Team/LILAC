package com.lilacmusic.backend.global.security.oauth2;


import com.lilacmusic.backend.member.entity.Member.RegistrationId;

/**
 * 유저 oauth 정보를 저장할 인터페이스
 */
public interface MemberInfo {

    /**
     * @implNote 사용자의 이메일을 반환해야 한다.
     * @return 사용자의 email
     */
    String getEmail();

    /**
     * @implNote 사용자의 가입 경로를 반환해야 한다.
     * @return {@link RegistrationId}
     */
    RegistrationId getRegistrationId();

    String getNickname();

    String getImageUrl();
}
