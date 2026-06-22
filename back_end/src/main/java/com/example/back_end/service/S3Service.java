package com.example.back_end.service;

import com.example.back_end.dto.response.UploadUrlResponse;
import com.example.back_end.entity.enums.UploadType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public UploadUrlResponse generateUploadUrl(
            UploadType type,
            String fileName,
            String contentType
    ) {

        String fileKey = generateFileKey(type, fileName);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileKey)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest =
                PutObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(15))
                        .putObjectRequest(putObjectRequest)
                        .build();

        String uploadUrl = s3Presigner
                .presignPutObject(presignRequest)
                .url()
                .toString();

        return new UploadUrlResponse(uploadUrl, fileKey);
    }

    private String generateFileKey(
            UploadType type,
            String fileName
    ) {
        String extension = "";
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex != -1) {
            extension = fileName.substring(dotIndex);
        }
        String uuid = UUID.randomUUID().toString();

        return switch (type) {
            case VIDEO -> "course-video/" + uuid + extension;
            case THUMBNAIL -> "course-thumbnail/" + uuid + extension;
            case RESOURCE -> "course-resource/" + uuid + extension;
            case DOCUMENT -> "course-document/" + uuid + extension;
        };
    }

    public String generatePresignedGetUrl(String fileKey) {

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(fileKey)
                .build();

        GetObjectPresignRequest presignRequest =
                GetObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(30))
                        .getObjectRequest(getObjectRequest)
                        .build();

        return s3Presigner
                .presignGetObject(presignRequest)
                .url()
                .toString();
    }

}
