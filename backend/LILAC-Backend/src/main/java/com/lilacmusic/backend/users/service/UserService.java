package com.lilacmusic.backend.users.service;

import com.lilacmusic.backend.users.dto.request.UserSignUpRequest;
import com.lilacmusic.backend.users.model.entity.User;
import com.lilacmusic.backend.users.model.enums.Role;
import com.lilacmusic.backend.users.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void signUp(UserSignUpRequest userSignUpRequest) throws Exception {

        if (userRepository.findByEmail(userSignUpRequest.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        User user = User.builder()
                .email(userSignUpRequest.getEmail())
                .nickname(userSignUpRequest.getNickname())
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }
}