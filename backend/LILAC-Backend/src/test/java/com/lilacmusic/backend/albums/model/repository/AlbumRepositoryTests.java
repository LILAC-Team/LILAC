package com.lilacmusic.backend.albums.model.repository;

import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.users.model.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;

import java.time.LocalDateTime;

@ActiveProfiles("test")
@DataJpaTest
public class AlbumRepositoryTests {


    @Autowired
    AlbumRepository albumRepository;

//    @Test
    public void getAlbumsByUserIdSuccess() {

        // given

        User user1 = User.builder()
                .userId(1l)
                .collectAlbumCount(0)
                .releaseAlbumCount(2)
                .email("aaa@bbb.cc")
                .isActive(true)
                .profileImage("aaa.jpg")
                .createdTime(LocalDateTime.of(2023, 04, 24, 01, 00))
                .modifiedTime(LocalDateTime.of(2023, 04, 24, 01, 00))
                .nickname("aa")
                .build();

        Album album1 = Album.builder().albumId(1L)
                .code("AAAA")
                .albumImage("AAAA.jpg")
                .userId(1L)
                .releasedDate(LocalDateTime.of(2023, 04, 24, 01, 01))
                .name("hypeboy")
                .build();
        Album album2 = Album.builder().albumId(2L)
                .code("BBBB")
                .albumImage("BBBB.jpg")
                .userId(1L)
                .releasedDate(LocalDateTime.of(2023, 04, 24, 06, 01))
                .name("cookie")
                .build();
        albumRepository.save(album1);
        albumRepository.save(album2);

        // when

        Page<Object[]> page = albumRepository.getAlbumsByUserId(1L, PageRequest.of(0, 6, Sort.Direction.DESC, "releasedDate"));


        // then

        assertThat((String) page.getContent().get(0)[0], is("BBBB"));
        assertThat((String) page.getContent().get(1)[0], is("AAAA"));
    }


}
