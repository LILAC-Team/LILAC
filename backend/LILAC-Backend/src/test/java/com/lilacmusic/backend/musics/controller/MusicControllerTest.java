package com.lilacmusic.backend.musics.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lilacmusic.backend.albums.controller.AlbumController;
import com.lilacmusic.backend.albums.dto.response.MemberInfoResponse;
import com.lilacmusic.backend.global.TestRequestAttributeFilter;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.musics.dto.request.CommentRequest;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.dto.response.CommentResponse;
import com.lilacmusic.backend.musics.dto.response.MusicDetailResponse;
import com.lilacmusic.backend.musics.dto.response.RecentCommentResponse;
import com.lilacmusic.backend.musics.service.CommentService;
import com.lilacmusic.backend.musics.service.MusicService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpServletRequest;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(SpringExtension.class)
@WebMvcTest(MusicController.class)
@AutoConfigureMockMvc
class MusicControllerTest {
    @MockBean
    private MusicService musicService;

    @MockBean
    private CommentService commentService;

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
    @DisplayName("음원 상세 성공 테스트")
    public void testGetMusicDetail() throws Exception {
        setUp("test@test.com");
        // Given
        String musicCode = "sample_music_code";
        RecentCommentResponse comment1 = RecentCommentResponse.builder()
                .content("Sample Comment 1")
                .presentTime(100)
                .memberInfo(MemberInfoResponse.builder()
                        .nickname("User1")
                        .profileImage("user1/profile/image")
                        .email("user1@example.com")
                        .build())
                .build();

        RecentCommentResponse comment2 = RecentCommentResponse.builder()
                .content("Sample Comment 2")
                .presentTime(200)
                .memberInfo(MemberInfoResponse.builder()
                        .nickname("User2")
                        .profileImage("user2/profile/image")
                        .email("user2@example.com")
                        .build())
                .build();

        List<RecentCommentResponse> recentCommentList = Arrays.asList(comment1, comment2);

        MusicDetailResponse musicDetailResponse = MusicDetailResponse.builder()
                .name("Sample Music")
                .artistName("Sample Artist")
                .playtime(180)
                .storagePath("sample/storage/path")
                .code(musicCode)
                .albumImage("sample/album/image")
                .recentCommentList(recentCommentList)
                .build();

        // When
        when(validator.validateEmail(any(HttpServletRequest.class))).thenReturn(1L);
        when(musicService.getMusicDetail(eq(musicCode), anyLong())).thenReturn(musicDetailResponse);

        // Then
        mockMvc.perform(get("/api/v1/musics/" + musicCode))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(musicDetailResponse)));

        verify(validator, times(1)).validateEmail(any(HttpServletRequest.class));
        verify(musicService, times(1)).getMusicDetail(eq(musicCode), anyLong());
    }

    @Test
    @WithMockUser
    @DisplayName("댓글 리스트 성공 테스트")
    public void testGetCommentList() throws Exception {
        setUp("test@test.com");
        // Given
        String musicCode = "sample_music_code";
        Integer pageNumber = 1;

        MemberInfoResponse member1 = MemberInfoResponse.builder()
                .nickname("User1")
                .profileImage("user1/profile/image")
                .email("user1@example.com")
                .build();

        MemberInfoResponse member2 = MemberInfoResponse.builder()
                .nickname("User2")
                .profileImage("user2/profile/image")
                .email("user2@example.com")
                .build();

        CommentResponse comment1 = CommentResponse.builder()
                .code("comment_code_1")
                .content("Sample Comment 1")
                .presentTime(100)
                .createdTime(LocalDateTime.of(2023, 5, 1, 10, 0))
                .memberInfo(member1)
                .build();

        CommentResponse comment2 = CommentResponse.builder()
                .code("comment_code_2")
                .content("Sample Comment 2")
                .presentTime(200)
                .createdTime(LocalDateTime.of(2023, 5, 1, 11, 0))
                .memberInfo(member2)
                .build();

        List<CommentResponse> commentList = Arrays.asList(comment1, comment2);

        CommentListResponse commentListResponse = CommentListResponse.builder()
                .commentList(commentList)
                .totalPages(1)
                .totalElements(2L)
                .number(pageNumber)
                .first(true)
                .last(true)
                .build();

        // When
        when(validator.validatePageNumberAndEmail(eq(pageNumber), any(HttpServletRequest.class))).thenReturn(1L);
        when(commentService.getCommentList(eq(musicCode), eq(pageNumber), anyLong())).thenReturn(commentListResponse);

        // Then
        mockMvc.perform(get("/api/v1/musics/" + musicCode + "/comments/" + pageNumber))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper()
                        .registerModule(new JavaTimeModule())
                        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                        .writeValueAsString(commentListResponse)));

        verify(validator, times(1)).validatePageNumberAndEmail(eq(pageNumber), any(HttpServletRequest.class));
        verify(commentService, times(1)).getCommentList(eq(musicCode), eq(pageNumber), anyLong());
    }

    @Test
    @WithMockUser
    @DisplayName("댓글 달기 성공 테스트")
    public void createMusicCommentTest() throws Exception {
        // Given
        String email = "user@email.com";
        setUp(email);

        String musicCode = "music_code";
        String content = "test comment";
        Integer presentTime = 100;

        CommentRequest commentRequest = CommentRequest.builder()
                .content(content)
                .presentTime(presentTime)
                .build();

        // When
        when(validator.validateEmail(any(HttpServletRequest.class))).thenReturn(1L);
        when(commentService.createMusicComment(anyLong(), any(CommentRequest.class), anyString())).thenReturn(1L);

        // Then
        mockMvc.perform(post("/api/v1/musics/" + musicCode + "/comments")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(commentRequest)))
                .andExpect(status().isCreated());

        verify(validator, times(1)).validateEmail(any(HttpServletRequest.class));
        verify(commentService, times(1)).createMusicComment(anyLong(), any(CommentRequest.class), anyString());
    }


    @Test
    @WithMockUser
    @DisplayName("댓글 삭제 성공 테스트")
    public void deleteMusicCommentTest() throws Exception {
        // Given
        String email = "user@email.com";
        setUp(email);

        String musicCode = "music_code";
        String commentCode = "comment_code";

        // When
        when(validator.validateEmail(any(HttpServletRequest.class))).thenReturn(1L);
        when(commentService.deleteMusicComment(anyLong(), anyString(), anyString())).thenReturn(1L);

        // Then
        mockMvc.perform(delete("/api/v1/musics/" + musicCode + "/comments/" + commentCode)
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(validator, times(1)).validateEmail(any(HttpServletRequest.class));
        verify(commentService, times(1)).deleteMusicComment(anyLong(), anyString(), anyString());
    }

}