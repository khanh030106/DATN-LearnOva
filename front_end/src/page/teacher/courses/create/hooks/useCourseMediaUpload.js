import {isValidUploadFile} from "../utils/courseCreationValidation.js";

export const useCourseMediaUpload = ({
                                         courseId,
                                         onCourseChange,
                                         onLessonSourceChange,
                                         onLessonVideoChange,
                                         onLessonResourcesChange,
                                     } = {}) => {

    const handleThumbnailSelected = (file) => {
        if (!isValidUploadFile(file)) {
            return;
        }
        onCourseChange?.({
            thumbnailFile: file, thumbnailPreviewUrl: URL.createObjectURL(file),
        });
    };

    const handleLessonSourceSelected = (sectionId, lessonId, file) => {
        if (!isValidUploadFile(file)) {
            return;
        }
        onLessonSourceChange?.(sectionId, lessonId, file);
    };

    const handleLessonVideoSelected = async (sectionId, lessonId, file) => {
        if (!isValidUploadFile(file)) return;

        try {
            const { uploadUrl, fileKey } = await createLessonVideoUploadUrl(lessonId, file, courseId, sectionId);
            await uploadFileToS3(uploadUrl, file);
            await completeLessonVideoUpload(lessonId, fileKey);
            onLessonVideoChange?.(sectionId, lessonId, {
                videoKey: fileKey,
                videoStatus: "READY",
                videoName: file.name,
            });
        } catch (error) {
            console.error(error);
            alert("Failed to upload lesson video.");
        }
    };

    const handleLessonResourceSelected = async (sectionId, lessonId, files, meta) => {
        const { resourceType } = meta || {};
        const uploadedResources = [];

        for (const file of files) {
            if (!isValidUploadFile(file)) continue;

            try {
                const { uploadUrl, fileKey } = await createLessonResourceUploadUrl(lessonId, file, courseId, sectionId);
                await uploadFileToS3(uploadUrl, file);
                uploadedResources.push({
                    id: crypto.randomUUID(),
                    name: file.name,
                    fileKey,
                    type: resourceType || "Document",
                });
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
        handleThumbnailSelected, handleLessonSourceSelected, handleLessonVideoSelected, handleLessonResourceSelected,
    };
};