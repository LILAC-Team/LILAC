package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.albums.dto.response.UserInfoResponse;
import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.dto.response.RecentCommentResponse;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.entity.RecentComment;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import com.lilacmusic.backend.musics.model.repository.RecentCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;

    private final RecentCommentRepository recentCommentRepository;

    @Override
    public MusicDetailResponse getMusicDetail(String musicCode, Long userId) throws NoMusicFoundException {
        Optional<Music> optionalMusic = musicRepository.findByCode(musicCode);
        if (optionalMusic.isEmpty()) {
            throw new NoMusicFoundException();
        }
        Music music = optionalMusic.get();
        // 유저의 음원 소유 확인 여부 로직 추가할건지???????????
        List<Object[]> recentComments = recentCommentRepository.findAllByMusicIdOrderByPresentTimeAsc(music.getMusicId());
        List<RecentCommentResponse> recentCommentResponseList = recentComments.stream().map(c ->
                RecentCommentResponse.builder()
                        .content((String) c[0])
                        .presentTime((Integer) c[1])
                        .userInfo(new UserInfoResponse((String) c[2], (String) c[3]))
                        .build()
        ).collect(Collectors.toList());
        MusicDetailResponse response = MusicDetailResponse.builder()
                .recentCommentList(recentCommentResponseList)
                .code(music.getCode())
                .name(music.getName())
                .artistName(music.getArtistName())
                .playtime(music.getPlaytime())
                .storagePath(music.getStoragePath())
                .build();

        return response;
    }
}
