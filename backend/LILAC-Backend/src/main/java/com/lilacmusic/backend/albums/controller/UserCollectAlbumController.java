package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.dto.request.UserCollectAlbumRequest;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.service.UserCollectAlbumService;
import com.lilacmusic.backend.global.error.GlobalErrorCode;
import com.lilacmusic.backend.member.exception.AccessDeniedException;
import com.lilacmusic.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/user-collect-albums")
@RequiredArgsConstructor
public class UserCollectAlbumController {

    private final UserCollectAlbumService userCollectAlbumService;

    private final MemberService memberService;

    @PostMapping("")
    public ResponseEntity<?> collectAlbum(HttpServletRequest request,
                                          @RequestBody UserCollectAlbumRequest userCollectAlbumRequest) throws NoAlbumFoundException {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);
        if (memberId.equals(-1L)) {
            throw new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED);
        }
        Long id = userCollectAlbumService.collectAlbum(userCollectAlbumRequest.getCode(), memberId);
        log.debug("UCA id = " + id.toString());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
