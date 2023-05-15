package com.lilacmusic.backend.playlists.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.*;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Document(collection = "playlist")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayList {

    @Id
    private Long memberId;

    private List<PlayListMusic> musicList;
}
