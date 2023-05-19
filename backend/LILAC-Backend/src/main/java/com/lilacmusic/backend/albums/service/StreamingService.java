package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.request.AlbumRequest;
import com.lilacmusic.backend.musics.dto.request.MusicRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

public interface StreamingService {
    Long albumUpload(Long memberId, String name, MultipartFile imageFile);

    Integer musicUpload(Long albumId, AlbumRequest albumRequest, List<MultipartFile> musicFiles);

    void validateRequest(@Valid AlbumRequest albumRequest);

    void validateMusicRequest(@Valid MusicRequest musicRequest);
}
