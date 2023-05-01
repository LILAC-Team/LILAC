package com.lilacmusic.backend.albums.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.albums.dto.request.AlbumRequest;
import com.lilacmusic.backend.albums.dto.response.AlbumDetailResponse;
import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.service.AlbumService;
import com.lilacmusic.backend.albums.service.StreamingServiceImpl;
import com.lilacmusic.backend.global.error.GlobalErrorCode;
import com.lilacmusic.backend.member.exception.AccessDeniedException;
import com.lilacmusic.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

    private final StreamingServiceImpl streamingService;

    @GetMapping("/released/{pageNumber}")
    public ResponseEntity<ReleasedAlbumListResponse> getReleasedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                       HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);
        if (memberId.equals(-1L)) {
            throw new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED);
        }

        ReleasedAlbumListResponse response = albumService.getReleasedAlbums(pageNumber, memberId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/collected/{pageNumber}")
    public ResponseEntity<CollectedAlbumListResponse> getCollectedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                         HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Long memberId = memberService.getMemberIdByEmail(email);
        if (memberId.equals(-1L)) {
            throw new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED);
        }

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
            @RequestPart("metadata") String metadata) throws JsonProcessingException {
        AlbumRequest albumRequest = new ObjectMapper().readValue(metadata, AlbumRequest.class);
        log.debug(albumRequest.toString());
        log.debug(imageFile.getOriginalFilename());
        for (MultipartFile m : musicFiles) {
            log.debug(m.getOriginalFilename());
        }

        streamingService.musicUpload(musicFiles);
        return ResponseEntity.ok("Success");
    }


}
