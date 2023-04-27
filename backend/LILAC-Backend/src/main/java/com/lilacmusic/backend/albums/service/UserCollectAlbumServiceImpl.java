package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.exceptions.NoAlbumFoundException;
import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.model.entitiy.UserCollectAlbum;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.albums.model.repository.UserCollectAlbumRepository;
import com.lilacmusic.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserCollectAlbumServiceImpl implements UserCollectAlbumService {
    private final UserCollectAlbumRepository userCollectAlbumRepository;

    private final AlbumRepository albumRepository;

    private final MemberRepository memberRepository;

    @Override
    public Long collectAlbum(String code, Long memberId) throws NoAlbumFoundException {
        Optional<Album> optionalAlbum = albumRepository.getAlbumByCode(code);
        if (optionalAlbum.isEmpty()) {
            throw new NoAlbumFoundException();
        }
        UserCollectAlbum userCollectAlbum = UserCollectAlbum.builder()
                .albumId(optionalAlbum.get().getAlbumId())
                .memberId(memberId)
                .createdTime(LocalDateTime.now())
                .build();
        userCollectAlbumRepository.save(userCollectAlbum);

//        User user = userRepository.getReferenceById(memberId); 통계추가 필요

        return userCollectAlbum.getUserCollectAlbumId();
    }
}
