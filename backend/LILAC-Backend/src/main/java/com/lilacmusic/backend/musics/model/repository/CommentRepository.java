package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c.code, c.content, c.presentTime, c.createdTime, u.nickname, u.profileImage FROM Comment c INNER JOIN User u ON c.userId = u.userId WHERE c.musicId = ?1")
    Page<Object[]> findAllByMusicId(Long musicId, Pageable pageable);

}
