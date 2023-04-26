package com.lilacmusic.backend.musics.controller;

import com.lilacmusic.backend.musics.dto.request.CommentRequest;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.exceptions.NoCommentFoundException;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.exceptions.NotMyCommentException;
import com.lilacmusic.backend.musics.service.CommentService;
import com.lilacmusic.backend.musics.service.MusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/musics")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    private final CommentService commentService;

    @GetMapping("/{musicCode}")
    public ResponseEntity<MusicDetailResponse> getMusicDetail(@PathVariable("musicCode") String musicCode,
                                                              @RequestHeader HttpHeaders headers) throws NoMusicFoundException {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        MusicDetailResponse response = musicService.getMusicDetail(musicCode, userId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{musicCode}/comments/{pageNumber}")
    public ResponseEntity<CommentListResponse> getCommentList(@PathVariable("musicCode") String musicCode,
                                                              @PathVariable("pageNumber") Integer pageNumber,
                                                              @RequestHeader HttpHeaders headers) throws NoMusicFoundException {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        CommentListResponse response = commentService.getCommentList(musicCode, pageNumber, userId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/{musicCode}/comments")
    public ResponseEntity<Void> createMusicComment(@RequestHeader HttpHeaders headers,
                                                   @RequestBody CommentRequest commentRequest,
                                                   @PathVariable("musicCode") String musicCode) throws NoMusicFoundException {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        Long commentId = commentService.createMusicComment(userId, commentRequest, musicCode);
        log.info("Comment Created : ID = " + commentId.toString());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{musicCode}/comments/{commentCode}")
    public ResponseEntity<Void> deleteMusicComment(@RequestHeader HttpHeaders headers,
                                                   @PathVariable("musicCode") String musicCode,
                                                   @PathVariable("commentCode") String commentCode) throws NoCommentFoundException, NotMyCommentException {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        Long commentId = commentService.deleteMusicComment(userId, musicCode, commentCode);
        log.info("Comment Deleted : ID = " + commentId.toString());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
