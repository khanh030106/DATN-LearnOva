import { Info } from "lucide-react";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=1d4ed8&color=fff&name=Student";

const formatDate = (isoString) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const StudentRow = ({ student, onViewDetail }) => (
  <article className="teacher-student-row">
    <div className="teacher-student-row__profile">
      <img src={student.avatar || DEFAULT_AVATAR} alt={student.fullName} />
      <div>
        <strong>{student.fullName}</strong>
        <span>{student.email}</span>
      </div>
    </div>

    <div className="teacher-student-row__courses">
      {student.courseNames.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>

    <time className="teacher-student-row__date">
      {formatDate(student.enrolledAt)}
    </time>

    <div className="teacher-student-row__progress">
      <strong>{student.progressPercent}%</strong>
      <div aria-hidden="true">
        <span
          className={student.progressPercent === 100 ? "teacher-student-row__progress-bar--complete" : ""}
          style={{ width: `${student.progressPercent}%` }}
        />
      </div>
    </div>

    <div className="teacher-student-row__actions">
      <button
        type="button"
        aria-label={`View details of ${student.fullName}`}
        onClick={() => onViewDetail(student)}
      >
        <Info size={16} />
      </button>
    </div>
  </article>
);

export default StudentRow;
