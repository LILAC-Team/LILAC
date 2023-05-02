package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.request.AlbumRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StreamingService {
    Long albumUpload(Long memberId, String name, MultipartFile imageFile);

    Integer musicUpload(Long albumId, AlbumRequest albumRequest, List<MultipartFile> musicFiles);

}
