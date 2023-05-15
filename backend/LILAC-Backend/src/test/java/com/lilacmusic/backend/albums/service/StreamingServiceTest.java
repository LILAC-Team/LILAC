package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.request.AlbumRequest;
import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.member.repository.MemberRepository;
import com.lilacmusic.backend.musics.dto.request.MusicRequest;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.mediaconvert.MediaConvertClient;
import software.amazon.awssdk.services.mediaconvert.model.CreateJobRequest;
import software.amazon.awssdk.services.mediaconvert.model.CreateJobResponse;
import software.amazon.awssdk.services.mediaconvert.model.Job;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StreamingServiceTest {

    @InjectMocks
    private StreamingServiceImpl streamingService;

    @Mock
    private S3Client s3Client;

    @Mock
    private MediaConvertClient mediaConvertClient;

    @Mock
    private AlbumRepository albumRepository;

    @Mock
    private MusicRepository musicRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private MultipartFile imageFile;

    @Test
    public void testAlbumUpload() {
        // Given
        Long memberId = 1L;
        String name = "Test Album";
        String code = UUID.randomUUID().toString();
        String inputKey = "images/image-" + code + ".png";

        Album album = Album.builder().albumId(1L).build();

        when(imageFile.getOriginalFilename()).thenReturn("image.png");
        when(albumRepository.save(any())).thenReturn(album);

        try {
            // Creating a mock InputStream
            InputStream mockInputStream = new ByteArrayInputStream("test data".getBytes());
            when(imageFile.getInputStream()).thenReturn(mockInputStream);

            // Make sure putObject doesn't throw any Exception
            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class))).thenReturn(null);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // When
        Long result = streamingService.albumUpload(memberId, name, imageFile);

        // Then
        assertEquals(result, album.getAlbumId());
        verify(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));
        verify(albumRepository).save(any(Album.class));
        verify(memberRepository).updateReleasingByMemberId(memberId);
    }


    @Test
    void testMusicUpload() {
        // Given
        Long albumId = 1L;
        AlbumRequest albumRequest = AlbumRequest.builder().musicList(new ArrayList<>()).build(); // Create album request as needed
        List<MultipartFile> mockMusicFiles = new ArrayList<>();

        // Create a mock MultipartFile and add to the list
        MultipartFile mockFile = mock(MultipartFile.class);
        mockMusicFiles.add(mockFile);

        // Create a mock MusicRequest and add to the album request
        MusicRequest mockMusicRequest = new MusicRequest(); // Initialize as needed
        albumRequest.getMusicList().add(mockMusicRequest);

        // Mock the methods
        try {
            when(mockFile.getOriginalFilename()).thenReturn("test.mp3");
            when(mediaConvertClient.createJob(any(CreateJobRequest.class))).thenReturn(CreateJobResponse.builder().job(Job.builder().id("testId").build()).build());
            when(musicRepository.save(any(Music.class))).thenReturn(new Music()); // Initialize as needed
            InputStream mockInputStream = new ByteArrayInputStream("test data".getBytes());
            when(mockFile.getInputStream()).thenReturn(mockInputStream);
            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class))).thenReturn(null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // When
        Integer result = streamingService.musicUpload(albumId, albumRequest, mockMusicFiles);

        // Then
        assertEquals(1, result);
        verify(mockFile).getOriginalFilename();
        verify(mediaConvertClient).createJob(any(CreateJobRequest.class));
        verify(musicRepository).save(any(Music.class));
    }
}