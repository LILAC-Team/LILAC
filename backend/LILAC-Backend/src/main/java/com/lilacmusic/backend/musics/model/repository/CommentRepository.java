package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.Comment;
import com.lilacmusic.backend.musics.model.mapping.CommentMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c.code AS code, c.content AS content, c.presentTime AS presentTime, c.createdTime AS createdTime, u.nickname AS nickname, u.profileImage AS profileImage, u.email AS email FROM Comment c INNER JOIN Member u ON c.memberId = u.memberId WHERE c.musicId = ?1")
    Page<CommentMapping> findAllByMusicId(Long musicId, Pageable pageable);

    Optional<Comment> findByCode(String code);

}
