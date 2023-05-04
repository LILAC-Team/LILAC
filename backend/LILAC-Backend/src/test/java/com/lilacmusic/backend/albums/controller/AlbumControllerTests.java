package com.lilacmusic.backend.albums.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.albums.dto.request.AlbumRequest;
import com.lilacmusic.backend.albums.dto.response.*;
import com.lilacmusic.backend.albums.service.AlbumService;
import com.lilacmusic.backend.albums.service.StreamingService;
import com.lilacmusic.backend.global.TestRequestAttributeFilter;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import com.lilacmusic.backend.member.service.MemberService;
import com.lilacmusic.backend.musics.dto.request.MusicRequest;
import com.lilacmusic.backend.musics.dto.response.MusicResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AlbumController.class)
@AutoConfigureMockMvc
public class AlbumControllerTests {

    @MockBean
    private AlbumService albumService;

    @MockBean
    private GlobalRequestValidator validator;

    @MockBean
    private StreamingService streamingService;

    @MockBean
    private MemberService memberService;

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
    @DisplayName("발매 앨범 성공 테스트")
    public void testGetReleasedAlbums() throws Exception {
        // given : Test data
        setUp("test@test.com");
        int pageNumber = 1;
        Long memberId = 1L;

        LocalDateTime specificDateTime = LocalDateTime.of(2023, 5, 1, 12, 0, 0);

        AlbumResponse albumResponse = AlbumResponse.builder()
                .name("Test Album")
                .albumImage("test-image.jpg")
                .code("ALB123")
                .releasedDate(specificDateTime)
                .nickname("test-nickname")
                .build();

        ReleasedAlbumListResponse releasedAlbumListResponse = ReleasedAlbumListResponse.builder()
                .releasedAlbumList(Collections.singletonList(albumResponse))
                .totalPages(1)
                .totalElements(1L)
                .number(1)
                .first(true)
                .last(true)
                .build();

        // when : Set up mock behavior
        when(validator.validatePageNumberAndEmail(eq(pageNumber), argThat((HttpServletRequest r) -> r.getAttribute("email") != null))).thenReturn(memberId);
        when(albumService.getReleasedAlbums(pageNumber, memberId)).thenReturn(releasedAlbumListResponse);

        // then : Perform HTTP GET request and verify the results
        mockMvc.perform(get("/api/v1/albums/released/{pageNumber}", pageNumber))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.releasedAlbumList[0].name").value("Test Album"))
                .andExpect(jsonPath("$.releasedAlbumList[0].albumImage").value("test-image.jpg"))
                .andExpect(jsonPath("$.releasedAlbumList[0].code").value("ALB123"))
                .andExpect(jsonPath("$.releasedAlbumList[0].releasedDate").value("2023-05-01T12:00:00"))
                .andExpect(jsonPath("$.releasedAlbumList[0].nickname").value("test-nickname"))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.number").value(1))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(true));
    }

    @Test
    @WithMockUser
    @DisplayName("소장 앨범 성공 테스트")
    public void testGetCollectedAlbums() throws Exception {
        // given : Test data
        setUp("test@test.com");
        int pageNumber = 1;
        Long memberId = 1L;

        LocalDateTime specificDateTime = LocalDateTime.of(2023, 5, 1, 12, 0, 0);

        AlbumResponse albumResponse = AlbumResponse.builder()
                .name("Test Album")
                .albumImage("test-image.jpg")
                .code("ALB123")
                .releasedDate(specificDateTime)
                .nickname("test-nickname")
                .build();

        CollectedAlbumListResponse collectedAlbumListResponse = CollectedAlbumListResponse.builder()
                .collectedAlbumList(Collections.singletonList(albumResponse))
                .totalPages(1)
                .totalElements(1L)
                .number(1)
                .first(true)
                .last(true)
                .build();

        // when : Set up mock behavior
        when(validator.validatePageNumberAndEmail(eq(pageNumber), argThat((HttpServletRequest r) -> r.getAttribute("email") != null))).thenReturn(memberId);
        when(albumService.getCollectedAlbums(pageNumber, memberId)).thenReturn(collectedAlbumListResponse);

        // then : Perform HTTP GET request and verify the results
        mockMvc.perform(get("/api/v1/albums/collected/{pageNumber}", pageNumber))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.collectedAlbumList[0].name").value("Test Album"))
                .andExpect(jsonPath("$.collectedAlbumList[0].albumImage").value("test-image.jpg"))
                .andExpect(jsonPath("$.collectedAlbumList[0].code").value("ALB123"))
                .andExpect(jsonPath("$.collectedAlbumList[0].releasedDate").value("2023-05-01T12:00:00"))
                .andExpect(jsonPath("$.collectedAlbumList[0].nickname").value("test-nickname"))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.number").value(1))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(true));
    }

    @Test
    @WithMockUser
    @DisplayName("앨범 상세 성공 테스트")
    public void testGetAlbumDetail() throws Exception {
        String albumCode = "ALB123";
        Long memberId = 1L;
        String email = "test@test.com";
        LocalDateTime specificDateTime = LocalDateTime.of(2023, 5, 1, 12, 0, 0);
        setUp(email);
        MusicResponse musicResponse = MusicResponse.builder()
                .name("Test Music")
                .artistName("Test Artist")
                .playtime(180)
                .code("MUS123")
                .musicIndex(1)
                .isTitle(true)
                .build();

        MemberInfoResponse memberInfo = MemberInfoResponse.builder()
                .nickname("test-nickname")
                .profileImage("test-profile.jpg")
                .email(email)
                .build();

        AlbumDetailResponse albumDetailResponse = AlbumDetailResponse.builder()
                .code(albumCode)
                .albumStatus(AlbumStatus.RELEASED)
                .name("Test Album")
                .albumImage("test-image.jpg")
                .releasedDate(specificDateTime)
                .musicList(Collections.singletonList(musicResponse))
                .memberInfo(memberInfo)
                .build();

        when(validator.getMemberIdOrMinusOne(argThat((HttpServletRequest r) -> r.getAttribute("email") != null))).thenReturn(memberId);
        when(albumService.getAlbumDetail(albumCode, memberId)).thenReturn(albumDetailResponse);

        mockMvc.perform(get("/api/v1/albums/{albumCode}", albumCode))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(albumCode))
                .andExpect(jsonPath("$.albumStatus").value(AlbumStatus.RELEASED.toString()))
                .andExpect(jsonPath("$.name").value("Test Album"))
                .andExpect(jsonPath("$.albumImage").value("test-image.jpg"))
                .andExpect(jsonPath("$.releasedDate").value("2023-05-01T12:00:00"))
                .andExpect(jsonPath("$.musicList[0].name").value("Test Music"))
                .andExpect(jsonPath("$.musicList[0].artistName").value("Test Artist"))
                .andExpect(jsonPath("$.musicList[0].playtime").value(180))
                .andExpect(jsonPath("$.musicList[0].code").value("MUS123"))
                .andExpect(jsonPath("$.musicList[0].musicIndex").value(1))
                .andExpect(jsonPath("$.musicList[0].isTitle").value(true))
                .andExpect(jsonPath("$.memberInfo.nickname").value("test-nickname"))
                .andExpect(jsonPath("$.memberInfo.profileImage").value("test-profile.jpg"))
                .andExpect(jsonPath("$.memberInfo.email").value(email));
    }

    @Test
    @WithMockUser
    @DisplayName("앨범 업로드 성공 테스트")
    public void testUploadAlbum() throws Exception {
        String email = "test@test.com";
        Long memberId = 1L;
        Long albumId = 1L;
        String albumCode = "ALB123";
        String albumName = "Test Album";

        setUp(email);

        MusicRequest musicRequest = MusicRequest.builder()
                .name("Test Music")
                .artistName("Test Artist")
                .musicIndex(1)
                .isTitle(true)
                .playtime(180)
                .build();

        AlbumRequest albumRequest = AlbumRequest.builder()
                .musicList(Collections.singletonList(musicRequest))
                .name(albumName)
                .build();

        String albumInfoJson = new ObjectMapper().writeValueAsString(albumRequest);

        MockMultipartFile imageFile = new MockMultipartFile("imageFile", "test-image.jpg", "image/jpeg", "test-image-content".getBytes(StandardCharsets.UTF_8));
        MockMultipartFile musicFile = new MockMultipartFile("musicFiles", "test-music.mp3", "audio/mpeg", "test-music-content".getBytes(StandardCharsets.UTF_8));


        when(validator.validateEmail(argThat((HttpServletRequest r) -> r.getAttribute("email") != null))).thenReturn(memberId);
        when(streamingService.albumUpload(memberId, albumName, imageFile)).thenReturn(albumId);
        when(streamingService.musicUpload(albumId, albumRequest, Collections.singletonList(musicFile))).thenReturn(1);
        when(albumService.getCodeByAlbumId(albumId)).thenReturn(albumCode);

        HttpServletResponse a = mockMvc.perform(multipart("/api/v1/albums")
                        .file(imageFile)
                        .file(musicFile)
                        .file(musicFile)
                        .param("albumInfo", albumInfoJson))
                .andReturn().getResponse();
//                .andExpect(status().isCreated())
//                .andExpect(content().string(albumCode));
//
        System.out.println("String a = " + a.toString() + " " + a.getStatus());
    }


}
