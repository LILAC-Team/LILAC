package com.lilacmusic.backend.users.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserSignUpRequest {

    private String email;
    private String nickname;

}
