package com.lilacmusic.backend.global.security.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {

    /**
     * 사용자 인증이 되어 있지않으면 GlobalErrorController로 redirect
     * @param request that resulted in an <code>AuthenticationException</code>
     * @param response so that the user agent can begin authentication
     * @param authException that caused the invocation
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {

        response.sendRedirect("/api/v1/error/jwt");
    }
}
