import {useRef} from "react";
import {Upload} from "lucide-react";

const VideoUploader = ({courseId, lessonId, currentFileUrl, accept, onUploadComplete, label}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const [file] = event.target.files;

        if (file) {
            onUploadComplete?.(file, {courseId, lessonId, currentFileUrl});
        }

        event.target.value = "";
    };

    return (
        <button type="button" aria-label={label} onClick={() => fileInputRef.current?.click()}>
            <Upload size={16}/>
            <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileChange}/>
        </button>
    );
};

export default VideoUploader;
