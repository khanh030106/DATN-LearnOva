import {Image} from "lucide-react";
import {THUMBNAIL_ACCEPTED_TYPES} from "../../utils/courseValidation.js";

const ThumbnailUploader = ({
                                     courseId,
                                     currentFileUrl,
                                     onUploadComplete,
                                 }) => {
    const uploadLabel = currentFileUrl
        ? "Replace course thumbnail"
        : "Upload course thumbnail";

    const handleFileChange = (event) => {
        const [file] = event.target.files;

        if (!file) {
            return;
        }
        onUploadComplete?.(file, {courseId});
    };
    return (
        <label
            className="teacher-upload-box"
            aria-label={uploadLabel}
        >
            {currentFileUrl ? (
                <img
                    src={currentFileUrl}
                    alt="Course thumbnail"
                    className="teacher-upload-box__preview"
                />
            ) : (
                <>
                    <Image size={34}/>
                    <strong>Upload Image</strong>
                    <span>Recommended size: 1280x720px</span>
                    <small>JPG, PNG up to 5MB</small>
                </>
            )}
            <input
                type="file"
                accept={THUMBNAIL_ACCEPTED_TYPES}
                onChange={handleFileChange}
            />
        </label>
    );
};

export default ThumbnailUploader;