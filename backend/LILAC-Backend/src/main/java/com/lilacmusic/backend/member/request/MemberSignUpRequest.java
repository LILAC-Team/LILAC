package com.lilacmusic.backend.member.request;

import com.lilacmusic.backend.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "멤버 회원가입 API 요청")
@Data
public class MemberSignUpRequest {

    @Email(message = "이메일은 필수 값입니다.")
    @Schema(description = "이메일")
    private String email;
    @NotNull(message = "가입경로는 필수 값입니다.")
    @Schema(description = "가입경로")
    private Member.RegistrationId registrationId;

    @NotBlank(message = "닉네임은 필수입니다.")
    @Pattern(regexp = "^\\S*$", message = "닉네임에 공백이 있으면 안됩니다.")
    @Pattern(regexp = "^[A-Za-z0-9가-힣]{2,16}$", message = "닉네임은 2글자 이상 16자 이하입니다.")
    @Schema(description = "닉네임")
    private String nickname;

    @Schema(description = "프로필이미지")
    private String profileImage;

    public Member toEntity() {
        return Member.builder()
                .nickname(this.nickname)
                .registrationId(this.registrationId)
                .email(this.email)
                .profileImage(this.profileImage)
                .build();
    }
}
