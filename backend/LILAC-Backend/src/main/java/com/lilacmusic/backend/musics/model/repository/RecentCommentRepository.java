package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.RecentComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecentCommentRepository extends JpaRepository<RecentComment, Long> {
}
