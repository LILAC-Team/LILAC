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
        Optional<Object[]> optionalMusic = musicRepository.findByCodeWithAlbumImage(musicCode);
        if (optionalMusic.isEmpty()) {
            throw new NoMusicFoundException();
        }

        // 유저의 음원 소유 확인 여부 로직 추가할건지???????????
        List<Object[]> recentComments = recentCommentRepository.findAllByMusicIdOrderByPresentTimeAsc((Long) optionalMusic.get()[0]);
        List<RecentCommentResponse> recentCommentResponseList = recentComments.stream().map(c ->
                RecentCommentResponse.builder()
                        .content((String) c[0])
                        .presentTime((Integer) c[1])
                        .userInfo(new UserInfoResponse((String) c[2], (String) c[3]))
                        .build()
        ).collect(Collectors.toList());
        MusicDetailResponse response = MusicDetailResponse.builder()
                .recentCommentList(recentCommentResponseList)
                .code((String) optionalMusic.get()[1])
                .name((String) optionalMusic.get()[2])
                .artistName((String) optionalMusic.get()[3])
                .playtime((Integer) optionalMusic.get()[4])
                .storagePath((String) optionalMusic.get()[5])
                .albumImage((String) optionalMusic.get()[6])
                .build();

        return response;
    }

    @Override
    public Long getMusicIdByCode(String code) throws NoMusicFoundException {
        Optional<Long> musicId = musicRepository.findMusicIdByCode(code);
        if (musicId.isEmpty()) {
            throw new NoMusicFoundException();
        }
        return musicId.get();
    }
}
