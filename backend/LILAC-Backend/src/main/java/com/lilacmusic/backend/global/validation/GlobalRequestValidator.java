package com.lilacmusic.backend.global.validation;

import com.lilacmusic.backend.global.error.common.InvalidPathVariableException;
import com.lilacmusic.backend.member.exception.AccessDeniedException;
import com.lilacmusic.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class GlobalRequestValidator {
    private final MemberService memberService;

    public Long validatePageNumberAndEmail(Integer pageNumber, HttpServletRequest request) {
        if (pageNumber == null || pageNumber < 1) {
            throw new InvalidPathVariableException();
        }
        return validateEmail(request);
    }

    public Long validateEmail(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);
        if (memberId.equals(-1L)) {
            throw new AccessDeniedException();
        }
        return memberId;
    }
}
