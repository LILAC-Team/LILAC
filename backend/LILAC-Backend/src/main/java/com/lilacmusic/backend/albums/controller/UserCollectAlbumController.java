package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.dto.request.UserCollectAlbumRequest;
import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.service.UserCollectAlbumService;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
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
public class UserCollectAlbumController {

    private final UserCollectAlbumService userCollectAlbumService;

    private final GlobalRequestValidator validator;


    @PostMapping("")
    public ResponseEntity<?> collectAlbum(HttpServletRequest request,
                                          @RequestBody UserCollectAlbumRequest userCollectAlbumRequest) throws NoAlbumFoundException {
        Long memberId = validator.validateEmail(request);
        Long id = userCollectAlbumService.collectAlbum(userCollectAlbumRequest.getCode(), memberId);
        log.debug("UCA id = " + id.toString());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
