package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.dto.response.AlbumDetailResponse;
import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    @GetMapping("/released/{pageNumber}")
    public ResponseEntity<ReleasedAlbumListResponse> getReleasedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                        @RequestHeader HttpHeaders headers){
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;

        ReleasedAlbumListResponse response = albumService.getReleasedAlbums(pageNumber, userId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/collected/{pageNumber}")
    public ResponseEntity<CollectedAlbumListResponse> getCollectedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                        @RequestHeader HttpHeaders headers) {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;

        CollectedAlbumListResponse response = albumService.getCollectedAlbums(pageNumber, userId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{albumCode}")
    public ResponseEntity<AlbumDetailResponse> getAlbumDetail(@PathVariable("albumCode") String albumCode,
                                                              @RequestHeader HttpHeaders headers) throws NoAlbumFoundException {
//        Long userId = getUserIdByAccessToken(headers.get("Authorization"));
        Long userId = 1L;

        AlbumDetailResponse response = albumService.getAlbumDetail(albumCode, userId);
        return ResponseEntity.ok().body(response);

    }


}
