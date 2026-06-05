import { Star, Users } from "lucide-react";

const CoursePreviewCard = ({ course }) => {
  return (
    <article className="teacher-course-card">
      <div className="teacher-course-card__media">
        <img src={course.image} alt={course.title} />
        <span>{course.status}</span>
      </div>
      <div className="teacher-course-card__body">
        <div className="teacher-course-card__meta">
          <span>{course.category}</span>
        </div>
        <h3>{course.title}</h3>
        <footer>
          <span>
            <Users size={15} />
            {course.students}
          </span>
          <span>
            <Star size={15} fill="currentColor" />
            {course.rating}
          </span>
        </footer>
      </div>
    </article>
  );
};

export default CoursePreviewCard;
