import {useEffect, useRef, useState} from "react";
import {FileText, GripVertical, HelpCircle, Pencil, PlayCircle, Trash2, FileUp, X} from "lucide-react";
import ResourceList from "./ResourceList.jsx";
import VideoUploader from "./VideoUploader.jsx";
import ResourceUploader from "./ResourceUploader.jsx";

const RESOURCE_TYPES = [
    {value: "Video", label: "Video", icon: PlayCircle},
    {value: "Document", label: "Document", icon: FileText},
    {value: "Resource", label: "Resource", icon: FileUp},
];

const iconMap = {
    Video: PlayCircle,
    Article: FileText,
    Quiz: HelpCircle,
    Document: FileText,
    Resource: FileUp,
};

const LessonRow = ({
                       courseId,
                       lesson,
                       sectionId,
                       onTitleChange,
                       onVideoChange,
                       onResourceChange,
                       onResourceRemove,
                       onDelete,
                   }) => {
    const Icon = iconMap[lesson.type] || FileText;
    const lessonTitle = lesson.title || "Enter lesson title...";
    const [isEditing, setIsEditing] = useState(false);
    const [draftTitle, setDraftTitle] = useState(lesson.title);
    const [resourceType, setResourceType] = useState(lesson.type || "Video");
    const titleInputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            titleInputRef.current?.focus();
            titleInputRef.current?.select();
        }
    }, [isEditing]);

    const commitTitle = () => {
        const nextTitle = draftTitle.trim();

        if (nextTitle !== lesson.title) {
            onTitleChange(nextTitle);
        } else {
            setDraftTitle(lesson.title);
        }

        setIsEditing(false);
    };

    const cancelTitleEdit = () => {
        setDraftTitle(lesson.title);
        setIsEditing(false);
    };

    const handleTitleKeyDown = (event) => {
        if (event.key === "Enter") {
            commitTitle();
        }

        if (event.key === "Escape") {
            cancelTitleEdit();
        }
    };

    const startTitleEdit = () => {
        setDraftTitle(lesson.title);
        setIsEditing(true);
    };

    return (
        <article className="teacher-lesson-builder-row">
            <GripVertical size={15}/>
            <span className="teacher-lesson-builder-row__icon">
        <Icon size={18}/>
      </span>
            <div className="teacher-lesson-builder-row__content">
                {isEditing ? (
                    <input
                        ref={titleInputRef}
                        value={draftTitle}
                        onChange={(event) => setDraftTitle(event.target.value)}
                        onBlur={commitTitle}
                        onKeyDown={handleTitleKeyDown}
                        aria-label={`Lesson ${lesson.lessonOrder} title`}
                    />
                ) : (
                    <strong>{lesson.lessonOrder}. {lessonTitle}</strong>
                )}
                {lesson.sourceName && <small>{lesson.sourceName}</small>}
                {lesson.videoName && <small className="teacher-lesson-builder-row__video-tag">🎬 {lesson.videoName}</small>}
                <ResourceList
                    resources={lesson.resources}
                    onRemove={(index) => onResourceRemove?.(index)}
                />
            </div>

            <select
                className="teacher-lesson-builder-row__type-select"
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
                aria-label="Select resource type"
            >
                {RESOURCE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>

            <button type="button" aria-label={`Edit ${lessonTitle}`} onClick={startTitleEdit}>
                <Pencil size={16}/>
            </button>

            {resourceType === "Video" && (
                <VideoUploader
                    courseId={courseId}
                    lessonId={lesson.id}
                    accept="video/mp4,video/webm,video/quicktime"
                    label="Upload lesson video"
                    onUploadComplete={(file) => onVideoChange?.(file)}
                />
            )}

            {(resourceType === "Document" || resourceType === "Resource") && (
                <ResourceUploader
                    courseId={courseId}
                    lessonId={lesson.id}
                    onUploadComplete={(files) => onResourceChange?.(files, {courseId, lessonId: lesson.id, resourceType})}
                />
            )}

            <button type="button" aria-label={`Delete ${lessonTitle}`} className="teacher-lesson-builder-row__delete"
                    onClick={onDelete}>
                <Trash2 size={16}/>
            </button>
        </article>
    );
};

export default LessonRow;
