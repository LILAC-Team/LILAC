package com.lilacmusic.backend.playlists.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayListAddRequest {
    @Size(max = 100, min = 1)
    private String code;
}
