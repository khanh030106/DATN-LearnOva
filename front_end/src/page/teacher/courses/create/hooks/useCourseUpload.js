import {isValidUploadFile} from "../utils/courseValidation.js";
import { generateUploadUrl } from "../../../../../api/teacher/UploadApi.js";
import { uploadFileToS3 } from "../../../../../services/UploadService.js";

export const useCourseUpload = ({
                                         onCourseChange,
                                         onLessonSourceChange,
                                         onLessonVideoChange,
                                         onLessonResourcesChange,
                                     } = {}) => {

    const handleThumbnailSelected = async (file) => {
        if (!isValidUploadFile(file)) {
            return;
        }
        const { uploadUrl, fileKey } =
            await generateUploadUrl({
                type: "THUMBNAIL",
                fileName: file.name,
                contentType: file.type,
            });
        await uploadFileToS3(
            uploadUrl,
            file
        );
        onCourseChange?.({
            thumbnailKey: fileKey,
            thumbnailPreviewUrl:
                URL.createObjectURL(file),
        });
    };

    const getVideoDuration = (file) => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                const duration = Math.floor(video.duration);
                resolve(duration);
            };

            video.onerror = () => {
                window.URL.revokeObjectURL(video.src);
                reject(new Error('Failed to load video metadata'));
            };

            video.src = URL.createObjectURL(file);
        });
    };

    const handleLessonVideoSelected = async (sectionId, lessonId, file) => {
        if (!isValidUploadFile(file)) {
            alert("Invalid file. Please select a valid video file.");
            return;
        }

        try {
            let durationSeconds = null;
            try {
                durationSeconds = await getVideoDuration(file);
            } catch (error) {
                console.warn("Could not extract video duration:", error);
            }
            const { uploadUrl, fileKey } = await generateUploadUrl({
                type: "VIDEO",
                fileName: file.name,
                contentType: file.type,
            });

            await uploadFileToS3(uploadUrl, file);

            onLessonVideoChange?.(sectionId, lessonId, {
                key: fileKey,
                name: file.name,
                contentType: file.type,
                sizeBytes: file.size,
                durationSeconds: durationSeconds,
            });

            console.log("Video uploaded successfully:", file.name);
        } catch (error) {
            console.error("Failed to upload video:", error);
            alert(`Failed to upload video: ${file.name}`);
        }
    };

    const handleLessonSourceSelected = (sectionId, lessonId, file) => {
        if (!isValidUploadFile(file)) {
            return;
        }
        onLessonSourceChange?.(sectionId, lessonId, file);
    };

    const handleLessonResourceSelected = async (sectionId, lessonId, files) => {
        const uploadedResources = [];

        for (const file of files) {
            if (!isValidUploadFile(file)) {
                console.warn(`Skipping invalid file: ${file.name}`);
                continue;
            }

            try {
                // Generate presigned URL
                const { uploadUrl, fileKey } = await generateUploadUrl({
                    type: "DOCUMENT",
                    fileName: file.name,
                    contentType: file.type,
                });

                await uploadFileToS3(uploadUrl, file);

                uploadedResources.push({
                    fileKey: fileKey,
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                });

                console.log("Resource uploaded successfully:", file.name);
            } catch (error) {
                console.error(`Failed to upload resource: ${file.name}`, error);
                alert(`Failed to upload: ${file.name}`);
            }
        }

        if (uploadedResources.length > 0) {
            onLessonResourcesChange?.(sectionId, lessonId, uploadedResources);
        }
    };

    return {
        handleThumbnailSelected,
        handleLessonVideoSelected,
        handleLessonSourceSelected,
        handleLessonResourceSelected,
    };
};