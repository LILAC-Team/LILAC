package com.lilacmusic.backend.playlists.controller;

import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.service.PlayListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playlists")
@RequiredArgsConstructor
public class PlayListController {
    private final PlayListService playListService;

    @GetMapping("")
    public ResponseEntity<PlayListResponse> getPlayList(@RequestHeader HttpHeaders headers) {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        PlayListResponse response = playListService.getPlayList(userId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("")
    public ResponseEntity<Void> addMusicToPlayList(@RequestHeader HttpHeaders headers, @RequestBody PlayListAddRequest playListAddRequest) {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        Long musicId = playListService.addMusicToPlayList(userId, playListAddRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("")
    public ResponseEntity<Void> editPlayList(@RequestHeader HttpHeaders headers, @RequestBody PlayListRequest playListRequest) {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        Integer listSize = playListService.editPlayList(userId, playListRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
