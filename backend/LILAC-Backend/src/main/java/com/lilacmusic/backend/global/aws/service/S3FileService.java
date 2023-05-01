package com.lilacmusic.backend.global.aws.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.mediaconvert.MediaConvertClient;
import software.amazon.awssdk.services.mediaconvert.model.*;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;

@Service
public class S3FileService {

    @Autowired
    private S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    @Value("${cloud.aws.mediaconvert.endpoint}")
    private String mediaConvertEndpoint;
    @Value("${cloud.aws.region.static}")
    private String awsRegion;
    @Value("${cloud.aws.mediaconvert.role}")
    private String iamRole;

    public String uploadFile(MultipartFile file) throws IOException {
        String key = generateUniqueFileName(file);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .build();

        InputStream inputStream = file.getInputStream();
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));
        inputStream.close();

        String convertedKey = convertToStreamableFormat(key);
        return getS3FileUrl(convertedKey);
    }


    private String generateUniqueFileName(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        if (!extension.equalsIgnoreCase(".mp3") && !extension.equalsIgnoreCase(".m4a") && !extension.equalsIgnoreCase(".wav")) {
            throw new IllegalArgumentException("Unsupported file type. Only MP3 and M4A and WAV files are supported.");
        }
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String timestamp = now.format(formatter);
        return "original-music/" + "test" + timestamp + extension;
    }

    private String getS3FileUrl(String key) {
        String cloudFrontDomain = "d1nj0um6xv6zar.cloudfront.net";
        return "https://" + cloudFrontDomain + "/" + key;
    }

    private String convertToStreamableFormat(String inputKey) {
        MediaConvertClient mediaConvert = MediaConvertClient.builder()
                .endpointOverride(URI.create(mediaConvertEndpoint))
                .region(Region.of(awsRegion))
                .build();

        String destination = String.format("s3://%s/musics/", bucketName);

        AudioSelector audioSelector = AudioSelector.builder()
                .selectorType("TRACK")
                .tracks(1)
                .build();

        String outputKey = inputKey.substring(0, inputKey.lastIndexOf('.'));

        CreateJobRequest createJobRequest = CreateJobRequest.builder()
                .role(iamRole)
                .settings(JobSettings.builder()
                        .inputs(Input.builder().audioSelectors(Collections.singletonMap("Audio Selector 1", audioSelector)).fileInput("s3://" + bucketName + "/" + inputKey).build())
                        .outputGroups(OutputGroup.builder()
                                .customName("AudioGroup")
                                .outputGroupSettings(OutputGroupSettings.builder()
                                        .type(OutputGroupType.HLS_GROUP_SETTINGS)
                                        .hlsGroupSettings(HlsGroupSettings.builder()
                                                .segmentLength(10)
                                                .minSegmentLength(1)
                                                .destination(destination)
                                                .build())
                                        .build())
                                .outputs(Output.builder()
                                        .containerSettings(ContainerSettings.builder()
                                                .container(ContainerType.M3_U8)
                                                .build())
                                        .extension(".m3u8")
                                        .nameModifier("_converted")
                                        .audioDescriptions(AudioDescription.builder()
                                                .audioSourceName("Audio Selector 1")
                                                .codecSettings(AudioCodecSettings.builder()
                                                        .codec(AudioCodec.AAC)
                                                        .aacSettings(AacSettings.builder()
                                                                .codingMode(AacCodingMode.CODING_MODE_2_0)
                                                                .sampleRate(48000)
                                                                .bitrate(128_000)
                                                                .build())
                                                        .build())
                                                .languageCodeControl("FOLLOW_INPUT")
                                                .build())
                                        .build())
                                .build())
                        .build())
                .build();

        CreateJobResponse createJobResponse = mediaConvert.createJob(createJobRequest);
        String jobId = createJobResponse.job().id();
        String convertedKey = outputKey + "_converted.m3u8";

        waitForJobCompletion(mediaConvert, jobId);

        return convertedKey;

    }

    private void waitForJobCompletion(MediaConvertClient mediaConvert, String jobId) {
        boolean isComplete = false;
        while (!isComplete) {
            GetJobRequest getJobRequest = GetJobRequest.builder().id(jobId).build();
            GetJobResponse getJobResponse = mediaConvert.getJob(getJobRequest);
            String status = getJobResponse.job().statusAsString();
            isComplete = "COMPLETE".equalsIgnoreCase(status) || "ERROR".equalsIgnoreCase(status);
            try {
                Thread.sleep(10000); // Wait for 10 seconds before checking the job status again
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}
