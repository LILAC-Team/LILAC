package com.lilacmusic.backend.global.security.oauth2;

import com.lilacmusic.backend.global.security.jwt.JwtTokenUtils;
import com.lilacmusic.backend.global.security.jwt.RefreshToken;
import com.lilacmusic.backend.member.entity.Member;
import com.lilacmusic.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.lilacmusic.backend.global.security.jwt.JwtTokenUtils.BEARER_PREFIX;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;


@RequiredArgsConstructor
@Component
@Slf4j
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenUtils jwtTokenUtils;
    private final MemberRepository memberRepository;

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;


    /**
     * 프론트의 로그인 추가입력 폼으로 리다이렉트
     *
     * @param request        the request which caused the successful authentication
     * @param response       the response
     * @param authentication the <tt>Authentication</tt> object which was created during
     *                       the authentication process.
     * @throws IOException
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        MemberInfo memberInfo = MemberInfoFactory.getMemberInfo(attributes, (OAuth2AuthenticationToken) authentication);

        Optional<Member> optionalMember = memberRepository.findByRegistrationIdAndEmail(memberInfo.getRegistrationId(), memberInfo.getEmail());
        String targetUrl;
        // 가입이 되어 있다면 토큰을 만들어서 넘겨주기
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            String tokens = BEARER_PREFIX + jwtTokenUtils.createTokens(member, List.of(new SimpleGrantedAuthority("ROLE_MEMBER")));
            RefreshToken token = jwtTokenUtils.generateRefreshToken(tokens);
            response.setHeader(AUTHORIZATION, tokens);
            targetUrl = UriComponentsBuilder.newInstance()
                    .scheme("https")
                    .host("lilac-music.net")
                    .port(443)
                    .path("/oauth")
                    .queryParam("email",member.getEmail())
                    .queryParam("profileImage", URLEncoder.encode(member.getProfileImage(), StandardCharsets.UTF_8))
                    .queryParam("nickname", URLEncoder.encode(member.getNickname(), StandardCharsets.UTF_8))
                    .queryParam("refreshToken", token.getRefreshTokenKey())
                    .queryParam("accessToken", token.getAccessTokenValue()).toUriString();
//                    .queryParam("email", member.getEmail())
//                    .queryParam("registrationId", member.getRegistrationId())
        } else {
            // 가입이 안 되어 있으니 추가 입력폼으로 넘기기
            targetUrl = UriComponentsBuilder.newInstance()
                    .scheme("https")
                    .host("lilac-music.net")
                    .port(443)
                    .path("/oauth")
                    .queryParam("nickname", URLEncoder.encode(memberInfo.getNickname(), StandardCharsets.UTF_8))
                    .queryParam("email", memberInfo.getEmail())
                    .queryParam("profileImage", memberInfo.getImageUrl())
                    .queryParam("registrationId", memberInfo.getRegistrationId()).toUriString();
        }
        log.info("{}", targetUrl);

        clearAuthenticationAttributes(request, response);
        response.sendRedirect(targetUrl);
    }

    // HttpCookie 삭제
    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}


