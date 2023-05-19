package com.lilacmusic.backend.albums.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCollectAlbumRequest {
    @Size(max = 100, min = 1)
    private String code;
}
