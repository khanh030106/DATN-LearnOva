import {useEffect, useRef, useState} from "react";
import {FileText, GripVertical, HelpCircle, Pencil, PlayCircle, Trash2} from "lucide-react";
import LessonResourceList from "./LessonResourceList.jsx";
import LessonVideoUploader from "./LessonVideoUploader.jsx";

const iconMap = {
    Video: PlayCircle,
    Article: FileText,
    Quiz: HelpCircle,
    Document: FileText,
};

const LessonRow = ({
                       courseId,
                       lesson,
                       onTitleChange,
                       onVideoChange,
                       onDelete,
                   }) => {
    const Icon = iconMap[lesson.type] || FileText;
    const lessonTitle = lesson.title || "Untitled lesson";
    const [isEditing, setIsEditing] = useState(false);
    const [draftTitle, setDraftTitle] = useState(lesson.title);
    const titleInputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            titleInputRef.current?.focus();
            titleInputRef.current?.select();
        }
    }, [isEditing]);

    const commitTitle = () => {
        const nextTitle = draftTitle.trim();

        if (nextTitle && nextTitle !== lesson.title) {
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
                <LessonResourceList resources={lesson.resources}/>
            </div>
            <button type="button" aria-label={`Edit ${lessonTitle}`} onClick={startTitleEdit}>
                <Pencil size={16}/>
            </button>
            <LessonVideoUploader
                courseId={courseId}
                lessonId={lesson.id}
                accept="video/mp4"
                label="Upload lesson video"
                onUploadComplete={(file) => onVideoChange?.(file)}
            />
            <button type="button" aria-label={`Delete ${lessonTitle}`} className="teacher-lesson-builder-row__delete"
                    onClick={onDelete}>
                <Trash2 size={16}/>
            </button>
        </article>
    );
};

export default LessonRow;
