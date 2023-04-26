//package com.lilacmusic.backend.common.security.oauth2.userinfo;
//
//import java.util.Map;
//
//public class KakaoUserInfo implements OAuth2UserInfo {
//    private Map<String, Object> attributes;
//    private Map<String, Object> attributesProperties;
//    private Map<String, Object> attributesAccount;
//    private Map<String, Object> attributesProfile;
//
//    public KakaoUserInfo(Map<String, Object> attributes) {
//        this.attributes = attributes;
//        this.attributesProperties = (Map<String, Object>) attributes.get("properties");
//        this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
//        this.attributesProfile = (Map<String, Object>) attributesAccount.get("profile");
//    }
//
//    @Override
//    public Map<String, Object> getAttributes() {
//        return attributes;
//    }
//
//    @Override
//    public String getProviderId() {
//        return attributes.get("id").toString();
//    }
//
//    @Override
//    public String getProvider() {
//        return "kakao";
//    }
//
//    @Override
//    public String getEmail() {
//        return attributesAccount.get("email").toString();
//    }
//
//    @Override
//    public String getNickname() {
//        return attributesProfile.get("nickname").toString();
//    }
//
//    @Override
//    public String getProfile() {
//        return attributesProperties.get("profile_image").toString();
//    }
//}