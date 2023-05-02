package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.albums.dto.response.MemberInfoResponse;
import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.dto.response.RecentCommentResponse;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.model.mapping.MusicImgMapping;
import com.lilacmusic.backend.musics.model.mapping.RecentCommentMapping;
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
    public MusicDetailResponse getMusicDetail(String musicCode, Long memberId) throws NoMusicFoundException {
        Optional<MusicImgMapping> music = musicRepository.findByCodeWithAlbumImage(musicCode);
        if (music.isEmpty()) {
            throw new NoMusicFoundException();
        }

        List<RecentCommentMapping> recentComments = recentCommentRepository.findAllByMusicIdOrderByPresentTimeAsc(music.get().getMusicId());
        List<RecentCommentResponse> recentCommentResponseList = recentComments.stream().map(c ->
                RecentCommentResponse.builder()
                        .content(c.getContent())
                        .presentTime(c.getPresentTime())
                        .memberInfo(new MemberInfoResponse(c.getNickname(), c.getProfileImage()))
                        .build()
        ).collect(Collectors.toList());
        MusicDetailResponse response = MusicDetailResponse.builder()
                .recentCommentList(recentCommentResponseList)
                .code(music.get().getCode())
                .name(music.get().getName())
                .artistName(music.get().getArtistName())
                .playtime(music.get().getPlaytime())
                .storagePath(music.get().getStoragePath())
                .albumImage(music.get().getAlbumImage())
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
