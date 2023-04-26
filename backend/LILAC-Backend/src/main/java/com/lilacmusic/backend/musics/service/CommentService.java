package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.musics.dto.request.CommentRequest;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.exceptions.NoCommentFoundException;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.exceptions.NotMyCommentException;

public interface CommentService {
    CommentListResponse getCommentList(String code, Integer pageNumber, Long userId) throws NoMusicFoundException;

    Long createMusicComment(Long userId, CommentRequest commentRequest, String musicCode) throws NoMusicFoundException;

    Long deleteMusicComment(Long userId, String musicCode, String commentCode) throws NoCommentFoundException, NotMyCommentException;
}
