import { Mail, MessageCircle, MoreHorizontal, Star } from "lucide-react";

const StudentRow = ({ student }) => {
  const progressValue = Number.parseInt(student.progress, 10);

  return (
    <article className="teacher-student-row">
      <div className="teacher-student-row__profile">
        <img src={student.avatar} alt={student.name} />
        <div>
          <strong>{student.name}</strong>
          <span>{student.email}</span>
        </div>
      </div>

      <div className="teacher-student-row__courses">
        {student.courses.map((course) => (
          <span key={course}>{course}</span>
        ))}
      </div>

      <time className="teacher-student-row__date" dateTime={student.joinedAt}>
        {student.joinedAt}
      </time>

      <div className="teacher-student-row__progress">
        <strong>{student.progress}</strong>
        <div aria-hidden="true">
          <span
            className={progressValue === 100 ? "teacher-student-row__progress-bar--complete" : ""}
            style={{ width: student.progress }}
          />
        </div>
      </div>

      <div className="teacher-student-row__rating">
        <Star size={16} fill="currentColor" />
        <strong>{student.rating}</strong>
      </div>

      <div className="teacher-student-row__actions" aria-label={`${student.name} actions`}>
        <button type="button" aria-label={`Email ${student.name}`}>
          <Mail size={18} />
        </button>
        <button type="button" aria-label={`Message ${student.name}`}>
          <MessageCircle size={18} />
        </button>
        <button type="button" aria-label={`More actions for ${student.name}`}>
          <MoreHorizontal size={18} />
        </button>
      </div>
    </article>
  );
};

export default StudentRow;
