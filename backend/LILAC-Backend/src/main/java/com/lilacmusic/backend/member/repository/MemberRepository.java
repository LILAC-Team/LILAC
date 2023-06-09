package com.lilacmusic.backend.member.repository;

import com.lilacmusic.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByRegistrationIdAndEmail(Member.RegistrationId registrationId, String email);

    Member findByEmail(String email);

    boolean existsByNickname(String nickname);

    Optional<Member> findByMemberId(Long memberId);

    @Query("SELECT m.memberId FROM Member m WHERE m.email = ?1")
    Optional<Long> findMemberIdByEmail(String email);

    @Modifying
    @Query("UPDATE Member m SET m.releaseAlbumCount = m.releaseAlbumCount + 1 WHERE m.memberId = ?1")
    Integer updateReleasingByMemberId(Long memberId);

    @Modifying
    @Query("UPDATE Member m SET m.collectAlbumCount = m.collectAlbumCount + 1 WHERE m.memberId = ?1")
    Integer updateCollectingByMemberId(Long memberId);


    /**
     * 소셜 타입과 소셜의 식별값으로 회원 찾는 메소드
     * 정보 제공을 동의한 순간 DB에 저장해야하지만, 아직 추가 정보(사는 도시, 나이 등)를 입력받지 않았으므로
     * 유저 객체는 DB에 있지만, 추가 정보가 빠진 상태이다.
     * 따라서 추가 정보를 입력받아 회원 가입을 진행할 때 소셜 타입, 식별자로 해당 회원을 찾기 위한 메소드
     */
//    Optional<Member> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

//    Optional<Member> findByEmail(String email); // 중복

//    Optional<Member> findByRefreshToken(String refreshToken); // redis에서 처리

}
