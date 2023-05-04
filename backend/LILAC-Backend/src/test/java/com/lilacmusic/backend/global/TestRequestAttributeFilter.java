package com.lilacmusic.backend.global;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TestRequestAttributeFilter extends OncePerRequestFilter {
    private final String attributeName;
    private final Object attributeValue;

    public TestRequestAttributeFilter(String attributeName, Object attributeValue) {
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        request.setAttribute(attributeName, attributeValue);
        filterChain.doFilter(request, response);
    }
}
