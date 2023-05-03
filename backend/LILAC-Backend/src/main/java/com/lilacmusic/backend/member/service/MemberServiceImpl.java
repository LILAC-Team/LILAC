package com.lilacmusic.backend.member.service;

import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.global.error.GlobalErrorCode;
import com.lilacmusic.backend.global.error.common.UploadFailException;
import com.lilacmusic.backend.global.security.jwt.JwtTokenUtils;
import com.lilacmusic.backend.global.security.jwt.RefreshToken;
import com.lilacmusic.backend.member.entity.Member;
import com.lilacmusic.backend.member.exception.AccessDeniedException;
import com.lilacmusic.backend.member.exception.IncorrectAdminInfoException;
import com.lilacmusic.backend.member.repository.MemberRepository;
import com.lilacmusic.backend.member.request.LoginInfo;
import com.lilacmusic.backend.member.request.MemberSignUpRequest;
import com.lilacmusic.backend.member.response.MemberSignUpResponse;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.mediaconvert.MediaConvertClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.lilacmusic.backend.global.security.jwt.JwtTokenUtils.BEARER_PREFIX;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final S3Client s3Client;
    private final JwtTokenUtils jwtTokenUtils;
    private final MemberRepository memberRepository;
    private Long memberId;

    @Value("${spring.security.user.name}")
    private String adminId;

    @Value("${spring.security.user.password}")
    private String adminPassword;


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.mediaconvert.role}")
    private String role;

    @Value("${cloud.aws.cloudfront.url_prefix}")
    private String cloudfrontUrlPrefix;

    /**
     * 관리자 계정 로그인
     *
     * @param loginInfo 로그인 정보
     * @return 관리자 계정 토큰
     */
    public String adminLogin(LoginInfo loginInfo) {
        if (!adminId.equals(loginInfo.getId()) || !adminPassword.equals(loginInfo.getPassword())) {
            throw new IncorrectAdminInfoException();
        }
        return BEARER_PREFIX + jwtTokenUtils.createTokens(loginInfo.getId(), List.of(() -> "ROLE_ADMIN"));
    }

    /**
     * 리프레시 토큰으로 액세스 토큰을 다시 만듬
     *
     * @param refreshToken 리프레시 토큰
     * @return 다시 만든 액세스 토큰
     */
    public String regenerateAccessToken(String refreshToken) {
        Optional<RefreshToken> findToken = jwtTokenUtils.findRefreshToken(refreshToken);
        RefreshToken findRefreshToken = findToken.orElseThrow(() -> new AccessDeniedException());
        return jwtTokenUtils.reCreateTokens(findRefreshToken);
    }

    /**
     * 회원 가입 로직
     * <p>
     * //     * @param request {@link MemberSignUpRequest} 회원가입 요청
     * //     * @return {@link MemberSignUpResponse} 회원 가입 응답
     */

    public MemberSignUpResponse signup(MemberSignUpRequest request) {
        Member member = request.toEntity();
        Member save = memberRepository.save(member);
        String token = BEARER_PREFIX + jwtTokenUtils.createTokens(save, List.of(new SimpleGrantedAuthority("ROLE_MEMBER")));
        RefreshToken refreshToken = jwtTokenUtils.generateRefreshToken(token);
        return new MemberSignUpResponse(save.getEmail(), save.getProfileImage(), save.getNickname(), refreshToken.getAccessTokenValue(), refreshToken.getRefreshTokenKey());
    }

    /**
     * 닉네임 중복체크 검사
     *
     * @param nickname 검사할 닉네임
     * @return true 면 중복이 아님
     */
    public boolean duplicateNickname(String nickname) {
        return !memberRepository.existsByNickname(nickname);
    }

//    @PostConstruct
//    public void initTestUser() {
//        Member member = Member.builder()
//                .registrationId(Member.RegistrationId.kakao)
//                .email("skyland310@naver.com")
//                .nickname("닉네임")
//                .build();
//
//        Member save = memberRepository.save(member);
//        memberId = save.getId();
//    }
//
//    public String testToken() {
//        Member member = memberRepository.findById(memberId).orElseThrow();
//        return jwtTokenUtils.createTokens(member, List.of(new SimpleGrantedAuthority("ROLE_MEMBER")));
//    }


    /**
     * 이메일로 가입한 멤버의 아이디 찾는 함수
     * TODO - cache 도입해야함 -
     *
     * @param email 토큰의 이메일
     * @return 이메일의 멤버 아이디, 없으면 -1 리턴
     */
    @Override
    @Cacheable(value = "memberIdCache")
    public Long getMemberIdByEmail(String email) {
        if (email == null) {
            return -1L;
        }
        Optional<Long> optionalMemberId = memberRepository.findMemberIdByEmail(email);
        return optionalMemberId.orElse(-1L);
    }

    @Override
    public Integer updateReleasingByMemberId(Long memberId) {
        Integer i = memberRepository.updateReleasingByMemberId(memberId);
        return i;
    }

    @Override
    public Integer updateCollectingByMemberId(Long memberId) {
        Integer i = memberRepository.updateCollectingByMemberId(memberId);
        return i;
    }

    @Override
    public String uploadProfileImage(MultipartFile profileImageFile) {
        String originalFilename = profileImageFile.getOriginalFilename();
        String extension = FilenameUtils.getExtension(originalFilename); // Get file extension
        String code = UUID.randomUUID().toString();
        String inputKey = "images/profileImage-" + code + "." + extension;
        uploadToS3(profileImageFile, inputKey);
        return cloudfrontUrlPrefix + inputKey;
    }

    private void uploadToS3(MultipartFile imageFile, String inputKey) {
        try (InputStream inputStream = imageFile.getInputStream()) {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(inputKey)
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, imageFile.getSize()));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UploadFailException();
        }
    }
}
