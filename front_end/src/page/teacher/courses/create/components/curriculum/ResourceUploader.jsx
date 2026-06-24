import {useRef} from "react";
import {FileUp} from "lucide-react";

const ResourceUploader = ({courseId, lessonId, onUploadComplete}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files || []);

        if (files.length > 0) {
            onUploadComplete?.(files, {courseId, lessonId});
        }

        event.target.value = "";
    };

    return (
        <button type="button" aria-label="Upload lesson resources" onClick={() => fileInputRef.current?.click()}>
            <FileUp size={16}/>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
            />
        </button>
    );
};

export default ResourceUploader;
