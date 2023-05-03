package com.lilacmusic.backend.albums.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.albums.dto.request.AlbumRequest;
import com.lilacmusic.backend.albums.dto.response.AlbumDetailResponse;
import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.service.AlbumService;
import com.lilacmusic.backend.albums.service.StreamingService;
import com.lilacmusic.backend.global.common.BaseResponse;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
@Slf4j
@Api(tags = "Album")
public class AlbumController {
    private final AlbumService albumService;

    private final MemberService memberService;

    private final StreamingService streamingService;

    private final GlobalRequestValidator validator;

    @GetMapping("/released/{pageNumber}")
    @Operation(summary = "내가 발매한 앨범 API",
            description = "내가 발매한 앨범을 가져오는 API, pageNumber는 1부터 시작되며 가지고 있는 이상의 입력의 경우 빈 리스트가 들어있는 객체 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "앨범 리스트 및 페이지 정보 반환", content = @Content(schema = @Schema(implementation = ReleasedAlbumListResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<ReleasedAlbumListResponse> getReleasedAlbums(@PathVariable("pageNumber") @ApiParam("페이지 번호") Integer pageNumber,
                                                                       HttpServletRequest request) {
        Long memberId = validator.validatePageNumberAndEmail(pageNumber, request);

        ReleasedAlbumListResponse response = albumService.getReleasedAlbums(pageNumber, memberId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/collected/{pageNumber}")
    @Operation(summary = "내가 소장한 앨범 API",
            description = "내가 소장한 앨범을 가져오는 API, pageNumber는 1부터 시작되며 가지고 있는 이상의 입력의 경우 빈 리스트가 들어있는 객체 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "앨범 리스트 및 페이지 정보 반환", content = @Content(schema = @Schema(implementation = CollectedAlbumListResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<CollectedAlbumListResponse> getCollectedAlbums(@PathVariable("pageNumber") @ApiParam("페이지 번호") Integer pageNumber,
                                                                         HttpServletRequest request) {
        Long memberId = validator.validatePageNumberAndEmail(pageNumber, request);

        CollectedAlbumListResponse response = albumService.getCollectedAlbums(pageNumber, memberId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{albumCode}")
    @Operation(summary = "앨범 상세 API",
            description = "앨범 상세 정보를 가져오는 API, 앨범과 앨범에 소속된 음원 리스트 및 앨범 소유 여부를 표시")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "앨범 정보 반환", content = @Content(schema = @Schema(implementation = AlbumDetailResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<AlbumDetailResponse> getAlbumDetail(@PathVariable("albumCode") @ApiParam("앨범의 코드") String albumCode,
                                                              HttpServletRequest request) throws NoAlbumFoundException {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);

        AlbumDetailResponse response = albumService.getAlbumDetail(albumCode, memberId);
        return ResponseEntity.ok().body(response);

    }

    @PostMapping("")
    @Operation(summary = "앨범 업로드 API",
            description = "앨범 업로드 API, 앨범 제목과 커버 이미지, 음원 리스트 및 음원 정보 등이 필요")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "앨범 생성됨, 생성된 앨범 코드 반환", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<String> uploadAlbum(
            @RequestPart("imageFile") @ApiParam("앨범 커버 이미지") MultipartFile imageFile,
            @RequestPart("musicFiles") @ApiParam("음원 파일들") List<MultipartFile> musicFiles,
            @RequestPart("albumInfo") @ApiParam("앨범 및 음원 정보 - json을 string형식으로") String albumInfoJson,
            HttpServletRequest request
    ) throws JsonProcessingException, NoAlbumFoundException {
        AlbumRequest albumRequest = new ObjectMapper().readValue(albumInfoJson, AlbumRequest.class);
        Long memberId = validator.validateEmail(request);
        // file 개수 검증
        log.debug(albumRequest.toString());
        log.debug(imageFile.getOriginalFilename());
        for (MultipartFile m : musicFiles) {
            log.debug(m.getOriginalFilename());
        }

        Long albumId = streamingService.albumUpload(memberId, albumRequest.getName(), imageFile);
        Integer uploadCount = streamingService.musicUpload(albumId, albumRequest, musicFiles);
        log.debug("uploadCount : " + uploadCount.toString());
        // upload한 갯수 검증
        return ResponseEntity.status(HttpStatus.CREATED).body(albumService.getCodeByAlbumId(albumId));
    }

}
