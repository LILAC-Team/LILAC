package com.lilacmusic.backend.musics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentListResponse {
    List<CommentResponse> commentList;
    private Integer totalPages;
    private Long totalElements;
    private Integer number;
    private Boolean first;
    private Boolean last;
}
