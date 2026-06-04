import { Circle, Pencil, Star, Trash2 } from "lucide-react";

const statusLabels = {
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ARCHIVED: "Archived",
};

const CourseManagerCard = ({ course, onDelete, onUpdate }) => {
  const status = statusLabels[course.courseStatus] || "Review";

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

      <strong>{course.courseStatus === "PUBLISHED" ? course.students.replace(" students", "") : "-"}</strong>
      <strong>{course.courseStatus === "PUBLISHED" ? course.displayRevenue : "-"}</strong>

      <strong className="teacher-course-row__rating">
        {course.courseStatus === "PUBLISHED" ? (
          <>
            {course.rating}
            <Star size={14} fill="currentColor" />
          </>
        ) : (
          "-"
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
