import { Star } from "lucide-react";
import { useState } from "react";
import "./TeacherRow.css";

const getInitials = (name) =>
  String(name || "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TeacherAvatar = ({ instructor }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldShowImage = Boolean(instructor.avatar) && !hasImageError;

  if (shouldShowImage) {
    return (
      <img
        className="teacherRowAvatar"
        src={instructor.avatar}
        alt={instructor.name}
        onError={() => setHasImageError(true)}
      />
    );
  }

  return (
    <div className="teacherRowAvatar teacherRowAvatar--placeholder">
      {getInitials(instructor.name)}
    </div>
  );
};

const TeacherRow = ({ instructors = [] }) => {
  return (
    <section className="teacherRowSection" aria-label="Featured Instructors">
      <div className="teacherRowCard">
        <div className="teacherRowCardHeader">
          <div>
            <h3 className="teacherRowCardTitle">Featured Instructors</h3>
          </div>
        </div>

        <div className="teacherRowList">
          {instructors.length === 0 && <p className="teacherRowEmpty">No instructors yet.</p>}
          {instructors.map((instructor) => (
            <article key={instructor.id} className="teacherRowItem">
              <div className="teacherRowAvatarWrap">
                <TeacherAvatar instructor={instructor} />
                <span className="teacherRowRank">{instructor.rank}</span>
              </div>

              <div className="teacherRowContent">
                <p className="teacherRowName">{instructor.name}</p>
                <p className="teacherRowCourseCount">
                  {instructor.courses} courses
                </p>
              </div>

              <div className="teacherRowRating">
                <Star
                  className="teacherRowStar"
                  size={10}
                  fill="currentColor"
                />
                <span className="teacherRowRatingValue">{instructor.rating}</span>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="teacherRowButton">
          View Rankings
        </button>
      </div>
    </section>
  );
};

export default TeacherRow;
