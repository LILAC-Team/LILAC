package com.lilacmusic.backend.playlists.controller;

import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.service.PlayListService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/playlists")
@RequiredArgsConstructor
@Api(tags = "PlayList")
public class PlayListController {
    private final PlayListService playListService;

    private final GlobalRequestValidator validator;

    @GetMapping("")
    @Operation(summary = "재생목록 API",
            description = "재생목록 가져오는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "재생목록 가져오기 성공", content = @Content(schema = @Schema(implementation = PlayListResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<PlayListResponse> getPlayList(HttpServletRequest request) {
        Long memberId = validator.validateEmail(request);
        PlayListResponse response = playListService.getPlayList(memberId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("")
    @Operation(summary = "재생목록에 곡 추가 API",
            description = "재생목록 곡 추가 API, 추가할 음원 코드 보내야함")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "재생목록 곡 추가 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<Void> addMusicToPlayList(HttpServletRequest request, @RequestBody PlayListAddRequest playListAddRequest) throws NoMusicFoundException {
        Long memberId = validator.validateEmail(request);
        Long musicId = playListService.addMusicToPlayList(memberId, playListAddRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("")
    @Operation(summary = "재생목록 수정 API",
            description = "재생목록 수정 API, 수정된 재생목록 통째로 넘겨야함")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "재생목록 수정 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<Void> editPlayList(HttpServletRequest request, @RequestBody PlayListRequest playListRequest) {
        Long memberId = validator.validateEmail(request);
        Integer listSize = playListService.editPlayList(memberId, playListRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
