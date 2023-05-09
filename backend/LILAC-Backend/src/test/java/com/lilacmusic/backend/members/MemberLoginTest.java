package com.lilacmusic.backend.members;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.global.common.BaseResponse;
import com.lilacmusic.backend.global.redis.RefreshTokenRepository;
import com.lilacmusic.backend.global.security.jwt.JwtTokenUtils;
import com.lilacmusic.backend.member.entity.Member;
import com.lilacmusic.backend.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;

import static com.lilacmusic.backend.global.security.jwt.JwtTokenUtils.BEARER_PREFIX;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        ).andExpect(status().is(401));
    }

}
