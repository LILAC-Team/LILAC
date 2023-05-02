package com.lilacmusic.backend.albums.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReleasedAlbumListResponse {
    private List<AlbumResponse> releasedAlbumList;
    private Integer totalPages;
    private Long totalElements;
    private Integer number;
    private Boolean first;
    private Boolean last;
}
