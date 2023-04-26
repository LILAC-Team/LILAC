package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.albums.dto.response.UserInfoResponse;
import com.lilacmusic.backend.musics.dto.request.CommentRequest;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.dto.response.CommentResponse;
import com.lilacmusic.backend.musics.exceptions.NoCommentFoundException;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.exceptions.NotMyCommentException;
import com.lilacmusic.backend.musics.model.entity.Comment;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.entity.RecentComment;
import com.lilacmusic.backend.musics.model.repository.CommentRepository;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.musics.model.repository.RecentCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private static final int PAGE_SIZE = 15;

    private final CommentRepository commentRepository;

    private final RecentCommentRepository recentCommentRepository;

    private final MusicRepository musicRepository;

    @Override
    public CommentListResponse getCommentList(String code, Integer pageNumber, Long userId) throws NoMusicFoundException {
        Optional<Music> optionalMusic = musicRepository.findByCode(code);
        if (optionalMusic.isEmpty()) {
            throw new NoMusicFoundException();
        }
        Long musicId = optionalMusic.get().getMusicId();
        Page<Object[]> commentList = commentRepository.findAllByMusicId(musicId,
                PageRequest.of(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "createdTime"));
        Page<CommentResponse> commentResponsePage = commentList.map(c ->
                CommentResponse.builder()
                        .code((String) c[0])
                        .content((String) c[1])
                        .presentTime((Integer) c[2])
                        .createdTime((LocalDateTime) c[3])
                        .userInfo(new UserInfoResponse((String) c[4], (String) c[5]))
                        .build()
        );
        CommentListResponse response = CommentListResponse.builder()
                .commentList(commentResponsePage.getContent())
                .number(commentResponsePage.getNumber() + 1)
                .totalPages(commentResponsePage.getTotalPages())
                .totalElements(commentResponsePage.getTotalElements())
                .first(commentResponsePage.isFirst())
                .last(commentResponsePage.isLast())
                .build();

        return response;
    }

    @Override
    @Transactional
    public Long createMusicComment(Long userId, CommentRequest commentRequest, String musicCode) throws NoMusicFoundException {
        Optional<Music> optionalMusic = musicRepository.findByCode(musicCode);
        if (optionalMusic.isEmpty()) {
            throw new NoMusicFoundException();
        }
        Long musicId = optionalMusic.get().getMusicId();
        String code = UUID.randomUUID().toString();
        Comment comment = Comment.builder()
                .musicId(musicId)
                .userId(userId)
                .code(code)
                .content(commentRequest.getContent())
                .presentTime(commentRequest.getPresentTime())
                .createdTime(LocalDateTime.now())
                .build();
        commentRepository.save(comment);

        Optional<RecentComment> optionalRecentComment = recentCommentRepository
                .getRecentCommentByMusicIdAndPresentTime(musicId, commentRequest.getPresentTime());
        if (optionalRecentComment.isEmpty()) {
            RecentComment recentComment = RecentComment.builder()
                    .userId(userId)
                    .musicId(musicId)
                    .content(commentRequest.getContent())
                    .presentTime(commentRequest.getPresentTime())
                    .build();
            recentCommentRepository.save(recentComment);
        } else {
            RecentComment recentComment = RecentComment.builder()
                    .recentCommentId(optionalRecentComment.get().getRecentCommentId())
                    .userId(userId)
                    .musicId(musicId)
                    .content(commentRequest.getContent())
                    .presentTime(commentRequest.getPresentTime())
                    .build();
            recentCommentRepository.save(recentComment);
        }

        return comment.getCommentId();
    }

    @Override
    @Transactional
    public Long deleteMusicComment(Long userId, String musicCode, String commentCode) throws NoCommentFoundException, NotMyCommentException {
        Optional<Comment> optionalComment = commentRepository.findByCode(commentCode);
        if (optionalComment.isEmpty()) {
            throw new NoCommentFoundException();
        }
        if (!userId.equals(optionalComment.get().getUserId())) {
            throw new NotMyCommentException();
        }
        // 지우는 댓글과 최신 댓글 비교해서 같은 댓글일시 둘다 삭제
        Optional<RecentComment> recentComment = recentCommentRepository
                .getRecentCommentByMusicIdAndPresentTime(optionalComment.get().getMusicId(), optionalComment.get().getPresentTime());
        if (recentComment.isPresent() && optionalComment.get().getUserId().equals(recentComment.get().getUserId())
                && optionalComment.get().getContent().equals(recentComment.get().getContent())) {
            recentCommentRepository.delete(recentComment.get());
        }
        Long id = optionalComment.get().getCommentId();
        commentRepository.delete(optionalComment.get());

        return id;
    }
}
