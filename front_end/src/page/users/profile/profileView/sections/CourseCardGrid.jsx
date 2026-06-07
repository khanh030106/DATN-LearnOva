import { Bookmark, Heart, Play, Star } from "lucide-react";

const CourseCardGrid = ({ courses = [], onOpenCourse, variant = "mine" }) => {
  const isFavorite = variant === "favorite";

  return (
    <div className="courses-grid favorite-grid">
      {courses.map((course, index) => (
        <article
          key={`${course.title}-${index}`}
          className="course-card"
          onClick={() => onOpenCourse?.(course)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpenCourse?.(course)}
        >
          <div className="course-image">
            <img src={course.image} alt={course.title} />
            {!isFavorite && (
              <span className="course-progress-badge">
                Progress: {course.progress}%
              </span>
            )}
            <button
              className={`course-bookmark ${isFavorite ? "favorite" : ""}`}
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Save course"}
              onClick={(e) => e.stopPropagation()}
            >
              {isFavorite ? <Heart size={14} /> : <Bookmark size={15} />}
            </button>
          </div>

          <div className="course-content">
            <h4>{course.title}</h4>

            <div className="course-teacher-row">
              <span>{course.instructor}</span>
              <span>
                <Star size={12} /> {course.rating} ({course.reviews})
              </span>
            </div>

            {!isFavorite && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            )}

            <div className="course-card-meta">
              <span>
                {course.lessonsDone} / {course.lessonsTotal} lessons
              </span>
              <span>{course.remaining}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCourse?.(course);
              }}
              className="continue-btn"
              type="button"
            >
              <Play size={13} />
              {isFavorite ? "View Course" : "Continue Learning"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CourseCardGrid;
