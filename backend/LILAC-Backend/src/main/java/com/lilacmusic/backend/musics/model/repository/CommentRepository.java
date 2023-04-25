package com.lilacmusic.backend.musics.model.repository;

import com.lilacmusic.backend.musics.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}