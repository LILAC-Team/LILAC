package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.albums.dto.response.UserInfoResponse;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.dto.response.CommentResponse;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.repository.CommentRepository;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.musics.model.repository.RecentCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
}
