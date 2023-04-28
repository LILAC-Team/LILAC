package com.lilacmusic.backend.playlists.controller;

import com.lilacmusic.backend.global.error.GlobalErrorCode;
import com.lilacmusic.backend.member.exception.AccessDeniedException;
import com.lilacmusic.backend.member.service.MemberService;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.service.PlayListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/playlists")
@RequiredArgsConstructor
public class PlayListController {
    private final PlayListService playListService;

    private final MemberService memberService;

    @GetMapping("")
    public ResponseEntity<PlayListResponse> getPlayList(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);
        if (memberId.equals(-1L)) {
            throw new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED);
        }
        PlayListResponse response = playListService.getPlayList(memberId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("")
    public ResponseEntity<Void> addMusicToPlayList(HttpServletRequest request, @RequestBody PlayListAddRequest playListAddRequest) throws NoMusicFoundException {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);
        if (memberId.equals(-1L)) {
            throw new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED);
        }
        Long musicId = playListService.addMusicToPlayList(memberId, playListAddRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("")
    public ResponseEntity<Void> editPlayList(HttpServletRequest request, @RequestBody PlayListRequest playListRequest) {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);
        if (memberId.equals(-1L)) {
            throw new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED);
        }
        Integer listSize = playListService.editPlayList(memberId, playListRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
