package com.lilacmusic.backend.playlists.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayListAddRequest {
    @Size(max = 100)
    private String code;
}
