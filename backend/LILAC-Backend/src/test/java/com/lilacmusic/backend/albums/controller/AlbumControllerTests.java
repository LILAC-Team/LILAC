package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.service.AlbumService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AlbumController.class)
public class AlbumControllerTests {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private AlbumService albumService;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void testGetReleasedAlbumsSuccess() throws Exception {
        // 테스트 데이터 설정
        Album album1 = Album.builder().albumId(1L).code("AAAA").albumImage("AAAA").name("hypeboy").userId(1L).releasedDate(LocalDateTime.now()).build();
        Album album2 = Album.builder().albumId(2L).code("BBBB").albumImage("BBBB").name("cookie").userId(1L).releasedDate(LocalDateTime.now()).build();
        List<Album> releasedAlbums = Arrays.asList(album1, album2);

        // 모킹 설정: albumService의 getUserReleasedAlbums가 테스트 데이터를 반환하도록 함

        // 테스트 실행

        // 모킹이 올바르게 호출되었는지 확인

    }

    @Test
    public void testGetReleasedAlbumsEmpty() throws Exception {

    }

    @Test
    public void testGetReleasedAlbumsNoUser() throws Exception {

    }

    @Test
    public void testGetReleasedAlbumsPaging() throws Exception {

    }
}
