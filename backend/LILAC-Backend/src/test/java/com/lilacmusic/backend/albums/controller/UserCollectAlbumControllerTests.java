package com.lilacmusic.backend.albums.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilacmusic.backend.albums.dto.request.UserCollectAlbumRequest;
import com.lilacmusic.backend.albums.service.UserCollectAlbumService;
import com.lilacmusic.backend.global.TestRequestAttributeFilter;
import com.lilacmusic.backend.global.validation.GlobalRequestValidator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserCollectAlbumController.class)
public class UserCollectAlbumControllerTests {
    @MockBean
    private UserCollectAlbumService userCollectAlbumService;

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
    public void collectAlbumTest() throws Exception {
        // Given
        String email = "user@email.com";
        setUp(email);

        UserCollectAlbumRequest userCollectAlbumRequest = UserCollectAlbumRequest.builder()
                .code("album_code")
                .build();

        // When
        when(validator.validateEmail(any(HttpServletRequest.class))).thenReturn(1L);
        when(userCollectAlbumService.collectAlbum(anyString(), anyLong())).thenReturn(1L);

        // Then
        mockMvc.perform(post("/api/v1/user-collect-albums")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(userCollectAlbumRequest)))
                .andExpect(status().isCreated());

        verify(validator, times(1)).validateEmail(any(HttpServletRequest.class));
        verify(userCollectAlbumService, times(1)).collectAlbum(anyString(), anyLong());
    }
}
