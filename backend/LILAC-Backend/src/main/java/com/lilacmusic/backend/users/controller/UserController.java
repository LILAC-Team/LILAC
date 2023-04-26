package com.lilacmusic.backend.users.controller;

import com.lilacmusic.backend.users.dto.request.UserSignUpRequest;
import com.lilacmusic.backend.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public String signUp(@RequestBody UserSignUpRequest userSignUpRequest) throws Exception {
        userService.signUp(userSignUpRequest);
        return "회원가입 성공";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}