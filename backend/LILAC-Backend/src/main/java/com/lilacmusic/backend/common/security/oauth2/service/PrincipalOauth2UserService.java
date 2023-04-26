//package com.lilacmusic.backend.common.security.oauth2.service;
//
//import com.lilacmusic.backend.common.security.oauth2.dto.KakaoUserInfo;
//import com.lilacmusic.backend.common.security.oauth2.dto.OAuth2UserInfo;
//import com.lilacmusic.backend.users.model.entity.User;
//import com.lilacmusic.backend.users.model.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//import java.util.UUID;
//
//@Service
//public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//
//        OAuth2UserInfo oAuth2UserInfo = null;
//        String provider = userRequest.getClientRegistration().getRegistrationId();
//
//        if (provider.equals("kakao")) {
//            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
//        }
//
//        String providerId = oAuth2UserInfo.getProviderId();
//        String username = provider + "_" + providerId;
//
//        String uuid = UUID.randomUUID().toString().substring(0, 6);
//        String password = bCryptPasswordEncoder.encode("패스워드" + uuid);
//
//        String email = oAuth2UserInfo.getEmail();
//
//        Optional<User> byUsername = userRepository.findByUsername(username);
//
//        //DB에 없는 사용자라면 회원가입처리
//        if (byUsername.isEmpty()) {
//            byUsername = User.oauth2Register()
//                    .username(username).password(password).email(email)
//                    .provider(provider).providerId(providerId)
//                    .build();
//            userRepository.save(byUsername.get());
//        }
//
//        return new PrincipalDetails(byUsername, oAuth2UserInfo);
//    }
//}