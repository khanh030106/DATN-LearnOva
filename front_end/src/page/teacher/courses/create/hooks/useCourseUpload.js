import {generateUploadUrl} from "../../../../../api/teacher/UploadApi.js";
import {uploadFileToS3} from "../../../../../services/UploadService.js";

export const useCourseUpload = ({onCourseChange, onLessonSourceChange} = {}) => {

    const handleThumbnailSelected = async (file) => {
        const {uploadUrl, fileKey} = await generateUploadUrl({
            type: "THUMBNAIL",
            fileName: file.name,
            contentType: file.type,
        });
        await uploadFileToS3(uploadUrl, file);
        onCourseChange?.({
            thumbnailKey: fileKey,
            thumbnailPreviewUrl: URL.createObjectURL(file),
        });
    };

    const handleLessonSourceSelected = (sectionId, lessonId, file) => {
        onLessonSourceChange?.(sectionId, lessonId, file);
    };

    return {
        handleThumbnailSelected,
        handleLessonSourceSelected,
    };
};
