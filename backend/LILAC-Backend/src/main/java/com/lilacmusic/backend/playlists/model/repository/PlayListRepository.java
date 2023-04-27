package com.lilacmusic.backend.playlists.model.repository;

import com.lilacmusic.backend.playlists.model.entitiy.PlayList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlayListRepository extends MongoRepository<PlayList, Long> {
}
