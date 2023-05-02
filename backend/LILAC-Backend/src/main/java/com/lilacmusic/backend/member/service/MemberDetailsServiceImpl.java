package com.lilacmusic.backend.member.service;

import com.lilacmusic.backend.member.entity.AdminDetails;
import com.lilacmusic.backend.member.entity.Member;
import com.lilacmusic.backend.member.entity.MemberDetails;
import com.lilacmusic.backend.member.repository.MemberRepository;
import com.lilacmusic.backend.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberDetailsServiceImpl implements UserDetailsService {

    @Value("${spring.security.user.name}")
    private String adminId;

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {

        if (!input.equals(adminId)) {
            Member member = Optional.ofNullable(memberRepository.findByEmail(input)).orElseThrow(MemberNotFoundException::new);
            return new MemberDetails(member);
        } else return new AdminDetails(input);
    }
}