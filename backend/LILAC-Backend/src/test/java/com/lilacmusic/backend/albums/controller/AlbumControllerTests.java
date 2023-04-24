package com.lilacmusic.backend.albums.controller;

import com.lilacmusic.backend.albums.dto.response.AlbumResponse;
import com.lilacmusic.backend.albums.dto.response.ReleasedAlbumListResponse;
import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.service.AlbumService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
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
    @DisplayName("get released success")
    public void testGetReleasedAlbumsSuccess() throws Exception {
        // given

        // 테스트 데이터 설정
        AlbumResponse album1 = AlbumResponse.builder().name("hypeboy").code("AAAA").albumImage("AAAA.jpg").build();
        AlbumResponse album2 = AlbumResponse.builder().name("cookie").code("BBBB").albumImage("BBBB.jpg").build();
        List<AlbumResponse> releasedAlbums = Arrays.asList(album2, album1);

        // 모킹 설정: albumService의 getUserReleasedAlbums가 테스트 데이터를 반환하도록 함
        Mockito.when(albumService.getReleasedAlbums(1, 1L))
                .thenReturn(ReleasedAlbumListResponse.builder()
                        .releasedAlbumList(releasedAlbums)
                        .first(true)
                        .last(true)
                        .totalElements(2L)
                        .totalPages(1)
                        .number(1)
                        .build());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "test1234");

        // when, then

        // 테스트 실행
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/albums/released/1")
                        .headers(headers))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.releasedAlbumList[0].name").value("cookie"))
                .andExpect(jsonPath("$.releasedAlbumList[1].name").value("hypeboy"))
                .andExpect(jsonPath("$.releasedAlbumList[0].code").value("BBBB"))
                .andExpect(jsonPath("$.releasedAlbumList[1].code").value("AAAA"))
                .andExpect(jsonPath("$.releasedAlbumList[0].albumImage").value("BBBB.jpg"))
                .andExpect(jsonPath("$.releasedAlbumList[1].albumImage").value("AAAA.jpg"))
                .andExpect(jsonPath("$.first").value("true"))
                .andExpect(jsonPath("$.last").value("true"))
                .andExpect(jsonPath("$.totalPages").value("1"))
                .andExpect(jsonPath("$.totalElements").value("2"))
        ;

        // 모킹이 올바르게 호출되었는지 확인
        Mockito.verify(albumService, Mockito.times(1)).getReleasedAlbums(1, 1L);

    }

    @Test
    @DisplayName("get released empty")
    public void testGetReleasedAlbumsEmpty() throws Exception {
        // given

        // 테스트 데이터 설정
        List<AlbumResponse> releasedAlbums = Arrays.asList();

        // 모킹 설정: albumService의 getUserReleasedAlbums가 테스트 데이터를 반환하도록 함
        Mockito.when(albumService.getReleasedAlbums(1, 1L))
                .thenReturn(ReleasedAlbumListResponse.builder()
                        .releasedAlbumList(releasedAlbums)
                        .first(false)
                        .last(true)
                        .totalElements(0L)
                        .totalPages(0)
                        .number(1)
                        .build());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "test1234");

        // when, then

        // 테스트 실행
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/albums/released/1")
                        .headers(headers))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.releasedAlbumList").isEmpty())
                .andExpect(jsonPath("$.first").value("false"))
                .andExpect(jsonPath("$.last").value("true"))
                .andExpect(jsonPath("$.totalPages").value("0"))
                .andExpect(jsonPath("$.totalElements").value("0"))
        ;

        // 모킹이 올바르게 호출되었는지 확인
        Mockito.verify(albumService, Mockito.times(1)).getReleasedAlbums(1, 1L);

    }

    @Test
    public void testGetReleasedAlbumsNoUser() throws Exception {

    }

    @Test
    public void testGetReleasedAlbumsPaging() throws Exception {

    }
}
