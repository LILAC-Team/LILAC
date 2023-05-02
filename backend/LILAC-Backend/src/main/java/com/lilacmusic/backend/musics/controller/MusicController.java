package com.lilacmusic.backend.musics.controller;

import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/musics")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    private final CommentService commentService;

    private final GlobalRequestValidator validator;

    @GetMapping("/{musicCode}")
    public ResponseEntity<MusicDetailResponse> getMusicDetail(@PathVariable("musicCode") String musicCode,
                                                              HttpServletRequest request) throws NoMusicFoundException {
        Long memberId = validator.validateEmail(request);
        MusicDetailResponse response = musicService.getMusicDetail(musicCode, memberId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{musicCode}/comments/{pageNumber}")
    public ResponseEntity<CommentListResponse> getCommentList(@PathVariable("musicCode") String musicCode,
                                                              @PathVariable("pageNumber") Integer pageNumber,
                                                              HttpServletRequest request) throws NoMusicFoundException {
        Long memberId = validator.validatePageNumberAndEmail(pageNumber, request);
        CommentListResponse response = commentService.getCommentList(musicCode, pageNumber, memberId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/{musicCode}/comments")
    public ResponseEntity<Void> createMusicComment(HttpServletRequest request,
                                                   @RequestBody CommentRequest commentRequest,
                                                   @PathVariable("musicCode") String musicCode) throws NoMusicFoundException {
        Long memberId = validator.validateEmail(request);
        Long commentId = commentService.createMusicComment(memberId, commentRequest, musicCode);
        log.info("Comment Created : ID = " + commentId.toString());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{musicCode}/comments/{commentCode}")
    public ResponseEntity<Void> deleteMusicComment(HttpServletRequest request,
                                                   @PathVariable("musicCode") String musicCode,
                                                   @PathVariable("commentCode") String commentCode) throws NoCommentFoundException, NotMyCommentException {
        Long memberId = validator.validateEmail(request);
        Long commentId = commentService.deleteMusicComment(memberId, musicCode, commentCode);
        log.info("Comment Deleted : ID = " + commentId.toString());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
