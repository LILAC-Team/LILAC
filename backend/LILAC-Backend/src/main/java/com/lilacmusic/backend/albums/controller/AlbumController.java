package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.dto.response.CollectedAlbumListResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/albums")
public class AlbumController {
    private AlbumService albumService;

    @Autowired
    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/released/{pageNumber}")
    public ResponseEntity<ReleasedAlbumListResponse> getReleasedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                        @RequestHeader HttpHeaders headers){
        return null;
    }

    @GetMapping("/collected/{pageNumber}")
    public ResponseEntity<CollectedAlbumListResponse> getCollectedAlbums(@PathVariable("pageNumber") Integer pageNumber,
                                                                        @RequestHeader HttpHeaders headers){
        return null;
    }

}
