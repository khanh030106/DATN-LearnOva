import { Circle, Pencil, Star, Trash2 } from "lucide-react";

const formatDuration = (totalSeconds) => {
  if (!totalSeconds) return "0:00";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const statusLabels = {
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ARCHIVED: "Archived",
};

const CourseCard = ({ course, onDelete, onUpdate }) => {
  const status = statusLabels[course.courseStatus] || "Review";
  const isPublished = course.courseStatus === "PUBLISHED";
  const studentCount = isPublished ? (course.studentCount ?? 0) : "-";
  const price = isPublished ? course.displayPrice : "-";
  const rating = isPublished ? course.rating : "-";

  return (
    <article className="teacher-course-row">
      <div className="teacher-course-row__course">
        <div className="teacher-course-row__media">
          <img src={course.image} alt={course.title} />
          <span>{formatDuration(course.totalDurationSeconds)}</span>
        </div>
        <div>
          <h2>{course.title}</h2>
          <p>
            {course.category}
            <span aria-hidden="true">•</span>
            {course.modules} Lessons
          </p>
        </div>
      </div>

      <span className={`teacher-course-row__status teacher-course-row__status--${course.courseStatus.toLowerCase()}`}>
        <Circle size={7} fill="currentColor" />
        {status}
      </span>

      <strong>{studentCount}</strong>
      <strong>{price}</strong>

      <strong className="teacher-course-row__rating">
        {isPublished ? (
          <>
            {rating}
            <Star size={14} fill="currentColor" />
          </>
        ) : (
          rating
        )}
      </strong>

      <span className="teacher-course-row__updated">{course.createdAgo}</span>

      <div className="teacher-course-row__actions">
        <button type="button" aria-label={`Update ${course.title}`} onClick={() => onUpdate(course)}>
          <Pencil size={16} />
        </button>
        <button type="button" aria-label={`Delete ${course.title}`} onClick={() => onDelete(course.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
