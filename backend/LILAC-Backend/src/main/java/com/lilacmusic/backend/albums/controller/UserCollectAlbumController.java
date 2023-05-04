package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.dto.request.UserCollectAlbumRequest;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.service.UserCollectAlbumService;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/user-collect-albums")
@RequiredArgsConstructor
@Api(tags = "Album")
public class UserCollectAlbumController {

    private final UserCollectAlbumService userCollectAlbumService;

    private final GlobalRequestValidator validator;


    @PostMapping("")
    @Operation(summary = "소장 앨범 추가 API",
            description = "소장 앨범 추가 API, 추가할 앨범 코드와 로그인 필요")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "앨범 생성됨, 생성된 앨범 코드 반환"),
            @ApiResponse(responseCode = "400", description = "Bad Request 잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "Unauthorized 로그인 필요 / 세션 만료"),
            @ApiResponse(responseCode = "404", description = "Not Found 해당 없음"),
            @ApiResponse(responseCode = "500", description = "서버 에러")
    })
    public ResponseEntity<?> collectAlbum(HttpServletRequest request,
                                          @RequestBody UserCollectAlbumRequest userCollectAlbumRequest) throws NoAlbumFoundException {
        Long memberId = validator.validateEmail(request);
        Long id = userCollectAlbumService.collectAlbum(userCollectAlbumRequest.getCode(), memberId);
        log.debug("UCA id = " + id.toString());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
