package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.dto.request.UserCollectAlbumRequest;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.service.UserCollectAlbumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/user-collect-albums")
@RequiredArgsConstructor
public class UserCollectAlbumController {

    private final UserCollectAlbumService userCollectAlbumService;

    @PostMapping("")
    public ResponseEntity<?> collectAlbum(@RequestHeader HttpHeaders headers,
                                          @RequestBody UserCollectAlbumRequest userCollectAlbumRequest) throws NoAlbumFoundException {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;
        Long id = userCollectAlbumService.collectAlbum(userCollectAlbumRequest.getCode(), userId);
        log.debug("UCA id = " + id.toString());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
