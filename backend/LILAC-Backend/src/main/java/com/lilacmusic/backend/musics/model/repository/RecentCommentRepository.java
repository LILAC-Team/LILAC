package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.RecentComment;
import com.lilacmusic.backend.musics.model.mapping.RecentCommentMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RecentCommentRepository extends JpaRepository<RecentComment, Long> {

    @Query("SELECT r.content AS content, r.presentTime AS presentTime, u.nickname AS nickname, u.profileImage AS profileImage FROM RecentComment r INNER JOIN Member u ON r.memberId = u.memberId WHERE r.musicId = ?1 ORDER BY r.presentTime ASC")
    List<RecentCommentMapping> findAllByMusicIdOrderByPresentTimeAsc(Long musicId);

    Optional<RecentComment> getRecentCommentByMusicIdAndPresentTime(Long musicId, Integer presentTime);

}
