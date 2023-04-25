package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.RecentComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecentCommentRepository extends JpaRepository<RecentComment, Long> {

    @Query("SELECT r.content, r.presentTime, u.nickname, u.profileImage FROM RecentComment r INNER JOIN User u ON r.userId = u.userId WHERE r.musicId = ?1 ORDER BY r.presentTime ASC")
    List<Object[]> findAllByMusicIdOrderByPresentTimeAsc(Long musicId);
}
