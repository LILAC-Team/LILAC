package com.lilacmusic.backend.albums.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CollectedAlbumListResponse {
    private List<AlbumResponse> collectedAlbumList;
    private Integer totalPages;
    private Long totalElements;
    private Integer number;
    private Boolean first;
    private Boolean last;
}
