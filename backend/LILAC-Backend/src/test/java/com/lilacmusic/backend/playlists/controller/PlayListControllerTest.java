package com.lilacmusic.backend.playlists.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.albums.controller.UserCollectAlbumController;
import com.lilacmusic.backend.global.TestRequestAttributeFilter;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.playlists.dto.request.PlayListAddRequest;
import com.lilacmusic.backend.playlists.dto.request.PlayListRequest;
import com.lilacmusic.backend.playlists.dto.response.PlayListResponse;
import com.lilacmusic.backend.playlists.model.entitiy.PlayListMusic;
import com.lilacmusic.backend.playlists.service.PlayListService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatcher;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(PlayListController.class)
public class PlayListControllerTest {

    @MockBean
    private PlayListService playListService;

    @MockBean
    private GlobalRequestValidator validator;

    @Autowired
    private WebApplicationContext webApplicationContext;
    @Autowired
    private MockMvc mockMvc;

    public void setUp(String email) {
        TestRequestAttributeFilter testRequestAttributeFilter = new TestRequestAttributeFilter("email", email);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(testRequestAttributeFilter)
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser
    @DisplayName("재생목록 요청 성공 테스트")
    public void getPlayListTest() throws Exception {
        // Given
        setUp("test@email.com");
        List<PlayListMusic> musicList = new ArrayList<>();
        musicList.add(PlayListMusic.builder()
                .name("Song1")
                .artistName("Artist1")
                .playtime(180)
                .code("song1_code")
                .albumImage("song1_image")
                .build());
        musicList.add(PlayListMusic.builder()
                .name("Song2")
                .artistName("Artist2")
                .playtime(200)
                .code("song2_code")
                .albumImage("song2_image")
                .build());
        PlayListResponse playListResponse = PlayListResponse.builder()
                .musicList(musicList)
                .listSize(musicList.size())
                .build();

        // When
        when(validator.validateEmail(ArgumentMatchers.any(HttpServletRequest.class))).thenReturn(1L);
        when(playListService.getPlayList(anyLong())).thenReturn(playListResponse);

        // Then
        mockMvc.perform(get("/api/v1/playlists").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.musicList", hasSize(2)))
                .andExpect(jsonPath("$.musicList[0].name", is("Song1")))
                .andExpect(jsonPath("$.musicList[0].artistName", is("Artist1")))
                .andExpect(jsonPath("$.musicList[0].playtime", is(180)))
                .andExpect(jsonPath("$.musicList[0].code", is("song1_code")))
                .andExpect(jsonPath("$.musicList[0].albumImage", is("song1_image")))
                .andExpect(jsonPath("$.musicList[1].name", is("Song2")))
                .andExpect(jsonPath("$.musicList[1].artistName", is("Artist2")))
                .andExpect(jsonPath("$.musicList[1].playtime", is(200)))
                .andExpect(jsonPath("$.musicList[1].code", is("song2_code")))
                .andExpect(jsonPath("$.musicList[1].albumImage", is("song2_image")))
                .andExpect(jsonPath("$.listSize", is(2)));

        verify(validator, times(1)).validateEmail(ArgumentMatchers.any(HttpServletRequest.class));
        verify(playListService, times(1)).getPlayList(anyLong());
    }

    @Test
    @WithMockUser
    @DisplayName("재생목록에 곡 추가 성공 테스트")
    public void addMusicToPlayListTest() throws Exception {
        // Given
        setUp("test@email.com");
        PlayListAddRequest playListAddRequest = PlayListAddRequest.builder()
                .code("song1_code")
                .build();

        // When
        when(validator.validateEmail(ArgumentMatchers.any(HttpServletRequest.class))).thenReturn(1L);
        when(playListService.addMusicToPlayList(anyLong(), ArgumentMatchers.eq(playListAddRequest))).thenReturn(1L);

        // Then
        mockMvc.perform(post("/api/v1/playlists")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(playListAddRequest)))
                .andExpect(status().isCreated());

        verify(validator, times(1)).validateEmail(ArgumentMatchers.any(HttpServletRequest.class));
        verify(playListService, times(1)).addMusicToPlayList(anyLong(), ArgumentMatchers.eq(playListAddRequest));
    }

    @Test
    @WithMockUser
    @DisplayName("재생목록 수정 성공 테스트")
    public void editPlayListTest() throws Exception {
        // Given
        setUp("test@email.com");
        List<PlayListMusic> musicList = new ArrayList<>();
        musicList.add(PlayListMusic.builder()
                .name("Song1")
                .artistName("Artist1")
                .playtime(180)
                .code("song1_code")
                .albumImage("song1_image")
                .build());
        musicList.add(PlayListMusic.builder()
                .name("Song2")
                .artistName("Artist2")
                .playtime(200)
                .code("song2_code")
                .albumImage("song2_image")
                .build());
        PlayListRequest playListRequest = PlayListRequest.builder()
                .musicList(musicList)
                .build();

        // When
        when(validator.validateEmail(ArgumentMatchers.any(HttpServletRequest.class))).thenReturn(1L);
        when(playListService.editPlayList(anyLong(), argThat(request -> {
            List<PlayListMusic> expectedMusicList = playListRequest.getMusicList();
            List<PlayListMusic> actualMusicList = request.getMusicList();

            if (expectedMusicList.size() != actualMusicList.size()) {
                return false;
            }

            return true;
        }))).thenReturn(2);

        // Then
        mockMvc.perform(put("/api/v1/playlists")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(playListRequest)))
                .andExpect(status().isOk());

        verify(validator, times(1)).validateEmail(ArgumentMatchers.any(HttpServletRequest.class));
        verify(playListService, times(1)).editPlayList(anyLong(), argThat(request -> {
            List<PlayListMusic> expectedMusicList = playListRequest.getMusicList();
            List<PlayListMusic> actualMusicList = request.getMusicList();

            if (expectedMusicList.size() != actualMusicList.size()) {
                return false;
            }

            return true;
        }));
    }


}
