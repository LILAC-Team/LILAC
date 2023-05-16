package com.lilacmusic.backend.members;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.global.common.BaseResponse;
import com.lilacmusic.backend.global.redis.RefreshTokenRepository;
import com.lilacmusic.backend.global.security.jwt.JwtTokenUtils;
import com.lilacmusic.backend.global.security.jwt.RefreshToken;
import com.lilacmusic.backend.member.entity.Member;
import com.lilacmusic.backend.member.repository.MemberRepository;
import com.lilacmusic.backend.member.request.ReGenerateAccessTokenRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import static com.lilacmusic.backend.global.security.jwt.JwtTokenUtils.BEARER_PREFIX;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
@AutoConfigureMockMvc
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@SuppressWarnings("NonAsciiCharacters")
@ActiveProfiles("test")
public class MemberLoginTest {

    @Autowired
    public ObjectMapper objectMapper;
    public static final String TOKEN_PREFIX = "Bearer ";

    public <T> BaseResponse<T> convertToBaseResponse(MockHttpServletResponse response) throws UnsupportedEncodingException, JsonProcessingException {

        return objectMapper.readValue(response.getContentAsString(), BaseResponse.class);
    }

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    @Autowired
    RedisTemplate<String, String> redisTemplate;
    public static final String AUTHORIZATION_HEADER = BEARER_PREFIX;
    @Autowired
    JwtTokenUtils jwtTokenUtils;
    @Autowired
    EntityManager em;
    @Autowired
    MockMvc mockMvc;
    String url = "http://localhost:8080/";
    Member member;

    @BeforeEach
    void setMember() {
        member = new Member("skyland310@naver.com", "윤식테스트", Member.RegistrationId.kakao, "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg");
        em.persist(member);
        em.flush();
        em.clear();
    }

    @Test
    @DisplayName("비 로그인 요청시 401 에러")
    void 비로그인시_401에러를_반환() throws Exception {
        mockMvc.perform(
                        get(url + "test")
                )
                .andDo(print())
                .andExpect(status().is(302))
                .andExpect(redirectedUrl("/api/v1/error/jwt"));
    }

    @Test
    @DisplayName("정상적인 로그인 요청")
    void 정상적인_로그인_요청() throws Exception {

        String tokens = jwtTokenUtils.createTokens(member, List.of(new SimpleGrantedAuthority("ROLE_MEMBER")));

        mockMvc.perform(
                        get(url + "test")
                                .header("Authorization", AUTHORIZATION_HEADER + tokens
                                ))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("RefreshToken 발급")
    void RefreshToken_발급() {
        String tokens = jwtTokenUtils.createTokens(member, List.of(new SimpleGrantedAuthority("ROLE_MEMBER")));
        RefreshToken refreshToken = jwtTokenUtils.generateRefreshToken(tokens);
        System.out.println("refreshToken.getRefreshToken() = " + refreshToken.getRefreshTokenKey());
        System.out.println("refreshToken.getAccessToken() = " + refreshToken.getAccessTokenValue());
        Assertions.assertNotNull(refreshToken.getRefreshTokenKey());
        Assertions.assertNotNull(refreshToken.getAccessTokenValue());
    }

    @Test
    @DisplayName("비정상 토큰으로 요청하는 경우")
    void 비정상_토큰() throws Exception {
        url += "test";
        mockMvc.perform(get(url)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer anim"))
                .andDo(print())
                .andExpect(status().is(302))
                .andExpect(redirectedUrl("/api/v1/error/jwt"));
    }

//    @Test
//    @DisplayName("Refresh로 다시 토큰 재발급 했는데 아직 만료안되서 실패")
//    void 토큰재발급실패() throws Exception {
//
//        String newAccessToken = jwtTokenUtils.createTokens(member, List.of(new SimpleGrantedAuthority("ROLE_MEMBER")));
//        RefreshToken refreshToken = jwtTokenUtils.generateRefreshToken(newAccessToken);
//        Optional<RefreshToken> validRefreshToken = jwtTokenUtils.findRefreshToken(refreshToken.getRefreshTokenKey());
//        Assertions.assertDoesNotThrow(() -> {
//            validRefreshToken.orElseThrow();
//        });
////        refreshToken = validRefreshToken.orElseThrow();
////        ReGenerateAccessTokenRequest request = new ReGenerateAccessTokenRequest(newAccessToken);
//
//        mockMvc.perform(
//                post("/api/v1/refresh")
//                        .content(this.objectMapper.writeValueAsBytes(newAccessToken))
//                        .contentType(MediaType.APPLICATION_JSON)
//        ).andExpect(jsonPath("$.status", is(HttpStatus.UNAUTHORIZED.value())));
//    }

}
