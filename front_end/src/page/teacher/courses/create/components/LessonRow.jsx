import { FileText, GripVertical, HelpCircle, MoreVertical, Pencil, PlayCircle } from "lucide-react";

const iconMap = {
  Video: PlayCircle,
  Article: FileText,
  Quiz: HelpCircle,
  Document: FileText,
};

const LessonRow = ({ lesson }) => {
  const Icon = iconMap[lesson.type] || FileText;

  return (
    <article className="teacher-lesson-builder-row">
      <GripVertical size={15} />
      <span className="teacher-lesson-builder-row__icon">
        <Icon size={18} />
      </span>
      <div>
        <strong>{lesson.lessonOrder}. {lesson.title}</strong>
        <small>
          {lesson.type}
          <span aria-hidden="true">•</span>
          {lesson.duration}
        </small>
      </div>
      <em>Published</em>
      <button type="button" aria-label={`Edit ${lesson.title}`}>
        <Pencil size={16} />
      </button>
      <button type="button" aria-label="More lesson options">
        <MoreVertical size={16} />
      </button>
    </article>
  );
};

export default LessonRow;
