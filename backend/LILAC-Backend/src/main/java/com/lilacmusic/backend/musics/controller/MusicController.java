package com.lilacmusic.backend.musics.controller;

import com.lilacmusic.backend.albums.dto.response.AlbumDetailResponse;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.musics.dto.request.CommentRequest;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.exceptions.NoCommentFoundException;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.exceptions.NotMyCommentException;
import com.lilacmusic.backend.musics.service.CommentService;
import com.lilacmusic.backend.musics.service.MusicService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Api(tags = "Music")
public class MusicController {

    private final MusicService musicService;

    private final CommentService commentService;

    private final GlobalRequestValidator validator;

    @GetMapping("/{musicCode}")
    @Operation(summary = "음원 상세 API",
            description = "음원 상세 정보를 가져오는 API, 음원의 상세 정보를 표시하고 음원에 달린 최신 댓글 리스트를 같이 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "음원 정보 반환", content = @Content(schema = @Schema(implementation = MusicDetailResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<MusicDetailResponse> getMusicDetail(@PathVariable("musicCode") @ApiParam("음원 코드") String musicCode,
                                                              HttpServletRequest request) throws NoMusicFoundException {
        Long memberId = validator.validateEmail(request);
        MusicDetailResponse response = musicService.getMusicDetail(musicCode, memberId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{musicCode}/comments/{pageNumber}")
    @Operation(summary = "음원 댓글 API",
            description = "음원 댓글들을 가져오는 API, 댓글 리스트 페이지로 반환, 페이지 번호는 1부터 시작")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "음원 정보 반환", content = @Content(schema = @Schema(implementation = CommentListResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<CommentListResponse> getCommentList(@PathVariable("musicCode") @ApiParam("음원 코드") String musicCode,
                                                              @PathVariable("pageNumber") @ApiParam("페이지 번호") Integer pageNumber,
                                                              HttpServletRequest request) throws NoMusicFoundException {
        Long memberId = validator.validatePageNumberAndEmail(pageNumber, request);
        CommentListResponse response = commentService.getCommentList(musicCode, pageNumber, memberId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/{musicCode}/comments")
    @Operation(summary = "음원 댓글 생성 API",
            description = "음원 댓글 생성 API, 댓글 내용과 댓글을 달 시간이 필요")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "댓글 생성 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<Void> createMusicComment(HttpServletRequest request,
                                                   @RequestBody CommentRequest commentRequest,
                                                   @PathVariable("musicCode") @ApiParam("음원 코드") String musicCode) throws NoMusicFoundException {
        Long memberId = validator.validateEmail(request);
        Long commentId = commentService.createMusicComment(memberId, commentRequest, musicCode);
        log.info("Comment Created : ID = " + commentId.toString());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{musicCode}/comments/{commentCode}")
    @Operation(summary = "음원 댓글 삭제 API",
            description = "음원 댓글 삭제 API, 댓글 및 최신 댓글에서 삭제, 자기가 단 댓글만 지움")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "댓글 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "403", description = "Forbidden 권한 없음 / 내 것이 아닌 경우 / 어드민이 아닌 경우"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<Void> deleteMusicComment(HttpServletRequest request,
                                                   @PathVariable("musicCode") @ApiParam("음원 코드") String musicCode,
                                                   @PathVariable("commentCode") @ApiParam("댓글 코드") String commentCode) throws NoCommentFoundException, NotMyCommentException {
        Long memberId = validator.validateEmail(request);
        Long commentId = commentService.deleteMusicComment(memberId, musicCode, commentCode);
        log.info("Comment Deleted : ID = " + commentId.toString());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
