const LessonResourceUploader = ({courseId, lessonId, onUploadComplete}) => {
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files || []);

        if (files.length > 0) {
            onUploadComplete?.(files, {courseId, lessonId});
        }

        event.target.value = "";
    };

    return (
        <input
            type="file"
            multiple
            aria-label="Upload lesson resources"
            onChange={handleFileChange}
        />
    );
};

export default LessonResourceUploader;
