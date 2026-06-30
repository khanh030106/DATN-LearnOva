import { X, Mail, Calendar, BookOpen, TrendingUp, Award } from "lucide-react";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=1d4ed8&color=fff&name=Student&size=128";

const formatDate = (isoString) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const StudentDetailModal = ({ student, onClose }) => {
  if (!student) return null;

  const progress = student.progressPercent ?? 0;
  const isComplete = progress === 100;

  return (
    <div className="sdm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sdm" role="dialog" aria-modal="true" aria-label={`Student detail: ${student.fullName}`}>

        {/* Header */}
        <div className="sdm__header">
          <button className="sdm__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
          <img
            src={student.avatar || DEFAULT_AVATAR.replace("Student", encodeURIComponent(student.fullName || "Student"))}
            alt={student.fullName}
            className="sdm__avatar"
          />
          <h2 className="sdm__name">{student.fullName}</h2>
          <span className={`sdm__badge ${isComplete ? "sdm__badge--complete" : "sdm__badge--active"}`}>
            {isComplete ? "Completed" : "In Progress"}
          </span>
        </div>

        {/* Body */}
        <div className="sdm__body">

          {/* Info cards */}
          <div className="sdm__info-grid">
            <div className="sdm__info-card">
              <Mail size={16} className="sdm__info-icon sdm__info-icon--blue" />
              <div>
                <span className="sdm__info-label">Email</span>
                <span className="sdm__info-value">{student.email || "-"}</span>
              </div>
            </div>
            <div className="sdm__info-card">
              <Calendar size={16} className="sdm__info-icon sdm__info-icon--purple" />
              <div>
                <span className="sdm__info-label">Ngày tham gia</span>
                <span className="sdm__info-value">{formatDate(student.enrolledAt)}</span>
              </div>
            </div>
            <div className="sdm__info-card">
              <BookOpen size={16} className="sdm__info-icon sdm__info-icon--green" />
              <div>
                <span className="sdm__info-label">Khóa học</span>
                <span className="sdm__info-value">{student.courseNames?.length ?? 0} khóa</span>
              </div>
            </div>
            <div className="sdm__info-card">
              <TrendingUp size={16} className="sdm__info-icon sdm__info-icon--orange" />
              <div>
                <span className="sdm__info-label">Tiến độ TB</span>
                <span className="sdm__info-value">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="sdm__section">
            <h3 className="sdm__section-title">
              <Award size={15} />
              Tiến độ tổng thể
            </h3>
            <div className="sdm__progress-wrap">
              <div className="sdm__progress-track">
                <div
                  className={`sdm__progress-fill ${isComplete ? "sdm__progress-fill--complete" : ""}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="sdm__progress-label">{progress}%</span>
            </div>
          </div>

          {/* Courses list */}
          {student.courseNames?.length > 0 && (
            <div className="sdm__section">
              <h3 className="sdm__section-title">
                <BookOpen size={15} />
                Khóa học đã đăng ký
              </h3>
              <ul className="sdm__course-list">
                {student.courseNames.map((name, idx) => (
                  <li key={idx} className="sdm__course-item">
                    <span className="sdm__course-num">{idx + 1}</span>
                    <span className="sdm__course-name">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sdm__footer">
          <button className="sdm__btn-cancel" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
