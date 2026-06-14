import { Circle, Pencil, Star, Trash2 } from "lucide-react";

const statusLabels = {
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ARCHIVED: "Archived",
};

const CourseManagerCard = ({ course, onDelete, onUpdate }) => {
  const status = statusLabels[course.courseStatus] || "Review";
  const isPublished = course.courseStatus === "PUBLISHED";
  const studentCount = isPublished ? course.students.replace(" students", "") : "-";
  const revenue = isPublished ? course.displayRevenue : "-";
  const rating = isPublished ? course.rating : "-";

  return (
    <article className="teacher-course-row">
      <div className="teacher-course-row__course">
        <div className="teacher-course-row__media">
          <img src={course.image} alt={course.title} />
          <span>{course.modules}:00</span>
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
      <strong>{revenue}</strong>

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

export default CourseManagerCard;
