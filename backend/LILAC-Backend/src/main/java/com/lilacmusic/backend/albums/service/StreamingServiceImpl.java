package com.lilacmusic.backend.albums.service;

import com.lilacmusic.backend.albums.model.repository.AlbumRepository;
import com.lilacmusic.backend.musics.model.entity.Music;
import com.lilacmusic.backend.musics.model.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.mediaconvert.MediaConvertClient;
import software.amazon.awssdk.services.mediaconvert.model.*;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StreamingServiceImpl {
    private final S3Client s3Client;
    private final MediaConvertClient mediaConvertClient;
    private final AlbumRepository albumRepository;
    private final MusicRepository musicRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.mediaconvert.role}")
    private String role;

    public List<Music> musicUpload(List<MultipartFile> files) {
        List<Music> musics = new ArrayList<>();

        for (MultipartFile file : files) {
            String originalFilename = file.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename); // Get file extension
            String uuid = UUID.randomUUID().toString();
            String inputKey = "original-music/music-" + uuid + "." + extension;
            String outputKey = "musics/music-" + uuid;

            // Upload file to S3
            try (InputStream inputStream = file.getInputStream()) {
                PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(inputKey)
                        .build();

                s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));

            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            // Start MediaConvert job
            try {
                CreateJobRequest createJobRequest = createJobRequest(inputKey, outputKey);
                CreateJobResponse createJobResponse = mediaConvertClient.createJob(createJobRequest);
                String jobId = createJobResponse.job().id();

                // Save to the database
                Music music = new Music();
//                musicRepository.save(music);

                musics.add(music);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return musics;
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
