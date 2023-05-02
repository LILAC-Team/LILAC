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
import com.lilacmusic.backend.global.error.GlobalErrorCode;
import com.lilacmusic.backend.global.error.common.InvalidPathVariableException;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.member.exception.AccessDeniedException;
import com.lilacmusic.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    private final MemberService memberService;

    private final StreamingService streamingService;

    private final GlobalRequestValidator validator;

    @GetMapping("/released/{pageNumber}")
    public ResponseEntity<ReleasedAlbumListResponse> getReleasedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                       HttpServletRequest request) {
        Long memberId = validator.validatePageNumberAndEmail(pageNumber, request);

        ReleasedAlbumListResponse response = albumService.getReleasedAlbums(pageNumber, memberId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/collected/{pageNumber}")
    public ResponseEntity<CollectedAlbumListResponse> getCollectedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                         HttpServletRequest request) {
        Long memberId = validator.validatePageNumberAndEmail(pageNumber, request);

        CollectedAlbumListResponse response = albumService.getCollectedAlbums(pageNumber, memberId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{albumCode}")
    public ResponseEntity<AlbumDetailResponse> getAlbumDetail(@PathVariable("albumCode") String albumCode,
                                                              HttpServletRequest request) throws NoAlbumFoundException {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);

        AlbumDetailResponse response = albumService.getAlbumDetail(albumCode, memberId);
        return ResponseEntity.ok().body(response);

    }

    @PostMapping("")
    public ResponseEntity<String> uploadAlbum(
            @RequestPart("imageFile") MultipartFile imageFile,
            @RequestPart("musicFiles") List<MultipartFile> musicFiles,
            @RequestPart("albumInfo") String albumInfoJson,
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
