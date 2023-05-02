package com.lilacmusic.backend.playlists.controller;

import com.lilacmusic.backend.global.error.GlobalErrorCode;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
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

    private final GlobalRequestValidator validator;

    @GetMapping("")
    public ResponseEntity<PlayListResponse> getPlayList(HttpServletRequest request) {
        Long memberId = validator.validateEmail(request);
        PlayListResponse response = playListService.getPlayList(memberId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("")
    public ResponseEntity<Void> addMusicToPlayList(HttpServletRequest request, @RequestBody PlayListAddRequest playListAddRequest) throws NoMusicFoundException {
        Long memberId = validator.validateEmail(request);
        Long musicId = playListService.addMusicToPlayList(memberId, playListAddRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("")
    public ResponseEntity<Void> editPlayList(HttpServletRequest request, @RequestBody PlayListRequest playListRequest) {
        Long memberId = validator.validateEmail(request);
        Integer listSize = playListService.editPlayList(memberId, playListRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
