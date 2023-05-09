package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.dto.request.AlbumRequest;
import com.lilacmusic.backend.albums.exceptions.MediaConvertFailException;
import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.global.error.common.UploadFailException;
import com.lilacmusic.backend.member.repository.MemberRepository;
import com.lilacmusic.backend.musics.dto.request.MusicRequest;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.mediaconvert.MediaConvertClient;
import software.amazon.awssdk.services.mediaconvert.model.*;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class StreamingServiceImpl implements StreamingService {
    private final S3Client s3Client;
    private final MediaConvertClient mediaConvertClient;
    private final AlbumRepository albumRepository;
    private final MusicRepository musicRepository;
    private final MemberRepository memberRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.mediaconvert.role}")
    private String role;

    @Override
    @Transactional
    public Long albumUpload(Long memberId, String name, MultipartFile imageFile) {
        String originalFilename = imageFile.getOriginalFilename();
        String extension = FilenameUtils.getExtension(originalFilename); // Get file extension
        String code = UUID.randomUUID().toString();
        String inputKey = "images/image-" + code + "." + extension;
        uploadToS3(imageFile, inputKey);
        Album album = Album.builder()
                .code(code)
                .memberId(memberId)
                .name(name)
                .albumImage(inputKey)
                .releasedDate(LocalDateTime.now())
                .build();
        albumRepository.save(album);
        memberRepository.updateReleasingByMemberId(memberId);

        return album.getAlbumId();
    }

    @Override
    @Transactional
    public Integer musicUpload(Long albumId, AlbumRequest albumRequest, List<MultipartFile> musicFiles) {
        List<MusicRequest> musicRequests = albumRequest.getMusicList();
        List<Music> musics = new ArrayList<>();

        for (int i = 0; i < musicRequests.size(); i++) {
            MultipartFile file = musicFiles.get(i);
            MusicRequest request = musicRequests.get(i);

            String originalFilename = file.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename); // Get file extension
            String uuid = UUID.randomUUID().toString();
            String inputKey = "original-music/music-" + uuid + "." + extension;
            String outputKey = "musics/music-" + uuid;

            // Upload file to S3
            uploadToS3(file, inputKey);

            // Start MediaConvert job
            try {
                CreateJobRequest createJobRequest = createJobRequest(inputKey, outputKey);
                CreateJobResponse createJobResponse = mediaConvertClient.createJob(createJobRequest);
                String jobId = createJobResponse.job().id();

                // Save to the database
                Music music = Music.builder()
                        .albumId(albumId)
                        .name(request.getName())
                        .artistName(request.getArtistName())
                        .playtime(request.getPlaytime())
                        .storagePath(outputKey + ".m3u8")
                        .code(uuid)
                        .musicIndex(request.getMusicIndex())
                        .isTitle(request.getIsTitle())
                        .build();
                musicRepository.save(music);
                musics.add(music);
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new MediaConvertFailException();
            }
        }

        return musics.size();
    }

    private void uploadToS3(MultipartFile imageFile, String inputKey) {
        try (InputStream inputStream = imageFile.getInputStream()) {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(inputKey)
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, imageFile.getSize()));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UploadFailException();
        }
    }

    private CreateJobRequest createJobRequest(String inputKey, String outputKey) {
        String inputFileS3Url = String.format("s3://%s/%s", bucket, inputKey);
        String outputS3Url = String.format("s3://%s/%s", bucket, outputKey);

        AudioSelector audioSelector = AudioSelector.builder()
                .selectorType("TRACK")
                .tracks(1) // 오디오 트랙 1을 선택합니다.
                .build();

        // Input configuration
        Input input = Input.builder()
                .audioSelectors(Collections.singletonMap("Audio Selector 1", audioSelector))
                .fileInput(inputFileS3Url)
                .build();

        // Output Group configuration
        OutputGroup outputGroup = OutputGroup.builder()
                .outputGroupSettings(OutputGroupSettings.builder()
                        .type("HLS_GROUP_SETTINGS")
                        .hlsGroupSettings(HlsGroupSettings.builder()
                                .segmentLength(10)
                                .minSegmentLength(0)
                                .destination(outputS3Url)
                                .build())
                        .build())
                .outputs(Output.builder()
                        .nameModifier("audio")
                        .containerSettings(ContainerSettings.builder()
                                .container("M3U8")
                                .build())
                        .audioDescriptions(AudioDescription.builder()
                                .codecSettings(AudioCodecSettings.builder()
                                        .codec(AudioCodec.AAC)
                                        .aacSettings(AacSettings.builder()
                                                .codingMode(AacCodingMode.CODING_MODE_5_1)
                                                .sampleRate(48_000)
                                                .bitrate(256_000)
                                                .build())
                                        .build())
                                .build())
                        .build())
                .build();

        // Job settings
        JobSettings jobSettings = JobSettings.builder()
                .inputs(input)
                .outputGroups(outputGroup)
                .build();

        // Create Job request
        CreateJobRequest createJobRequest = CreateJobRequest.builder()
                .role(role)
                .settings(jobSettings)
                .build();

        return createJobRequest;
    }
}
