package com.lilacmusic.backend.global.validation;

import com.lilacmusic.backend.global.error.common.InvalidPathVariableException;
import com.lilacmusic.backend.member.exception.AccessDeniedException;
import com.lilacmusic.backend.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.http.HttpServletRequest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class GlobalRequestValidatorTest {

    @Mock
    private MemberService memberService;

    @InjectMocks
    private GlobalRequestValidator globalRequestValidator;

    @Test
    void testValidatePageNumberAndEmail() {
        // Given
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        when(mockRequest.getAttribute("email")).thenReturn("test@example.com");
        when(memberService.getMemberIdByEmail("test@example.com")).thenReturn(1L);

        // When
        Long result = globalRequestValidator.validatePageNumberAndEmail(1, mockRequest);

        // Then
        assertEquals(1L, result);
    }

    @Test
    void testValidateEmail() {
        // Given
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        when(mockRequest.getAttribute("email")).thenReturn("test@example.com");
        when(memberService.getMemberIdByEmail("test@example.com")).thenReturn(1L);

        // When
        Long result = globalRequestValidator.validateEmail(mockRequest);

        // Then
        assertEquals(1L, result);
    }

    @Test
    void testGetMemberIdOrMinusOne() {
        // Given
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        when(mockRequest.getAttribute("email")).thenReturn("test@example.com");
        when(memberService.getMemberIdByEmail("test@example.com")).thenReturn(1L);

        // When
        Long result = globalRequestValidator.getMemberIdOrMinusOne(mockRequest);

        // Then
        assertEquals(1L, result);
    }

    @Test
    void testValidatePageNumberAndEmail_NullPageNumber() {
        // Given
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);

        // Then
        assertThrows(InvalidPathVariableException.class, () -> {
            globalRequestValidator.validatePageNumberAndEmail(null, mockRequest);
        });
    }

    @Test
    void testValidatePageNumberAndEmail_ZeroPageNumber() {
        // Given
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);

        // Then
        assertThrows(InvalidPathVariableException.class, () -> {
            globalRequestValidator.validatePageNumberAndEmail(0, mockRequest);
        });
    }

    @Test
    void testValidateEmail_NoMemberId() {
        // Given
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        when(mockRequest.getAttribute("email")).thenReturn("test@example.com");
        when(memberService.getMemberIdByEmail("test@example.com")).thenReturn(-1L);

        // Then
        assertThrows(AccessDeniedException.class, () -> {
            globalRequestValidator.validateEmail(mockRequest);
        });
    }
}