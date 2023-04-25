package com.lilacmusic.backend.musics.controller;

import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.service.MusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/musics")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    @GetMapping("/{musicCode}")
    public ResponseEntity<MusicDetailResponse> getMusicDetail(@PathVariable("musicCode") String musicCode,
                                                              @RequestHeader HttpHeaders headers) throws NoMusicFoundException {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        MusicDetailResponse response = musicService.getMusicDetail(musicCode, userId);
        return ResponseEntity.ok().body(response);
    }
}
