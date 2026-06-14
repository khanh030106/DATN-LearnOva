import {isValidUploadFile} from "../utils/courseCreationValidation.js";
import {
    createLessonVideoUploadUrl,
    completeLessonVideoUpload,
    uploadFileToS3,
} from "../../../../../api/teacher/courseCreation/courseMediaApi.js";

export const useCourseMediaUpload = ({
                                         onCourseChange,
                                         onLessonSourceChange,
                                         onLessonVideoChange,
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
            const { uploadUrl, fileKey } = await createLessonVideoUploadUrl(lessonId, file);
            await uploadFileToS3(uploadUrl, file);
            await completeLessonVideoUpload(lessonId);
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

    return {
        handleThumbnailSelected, handleLessonSourceSelected, handleLessonVideoSelected,
    };
};