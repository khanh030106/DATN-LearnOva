import {
  BarChart3,
  BookOpen,
  CircleDollarSign,
  Mail,
  Phone,
  Star,
  UserRound,
  Users,
  X,
} from "lucide-react";
import defaultCover from "../../../../assets/instructors/header-intructor.png";
import "./ViewInstructorModal.css";

const formatDate = (value) => {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB").format(date);
};

const formatDateTime = (value) => {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatMoney = (value, currency = "đ") => {
  if (value == null || value === "") return `0 ${currency}`;
  const number = Number(value) || 0;
  return `${new Intl.NumberFormat("vi-VN").format(number)} ${currency}`;
};

const formatCount = (value) => new Intl.NumberFormat("vi-VN").format(Number(value) || 0);

const getInitials = (name) =>
  String(name || "Instructor")
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "I";

const valueOrDash = (value) => {
  if (value === null || value === undefined || value === "") return "--";
  return value;
};

const prettifyStatus = (status) =>
  String(status || "N/A")
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getCourseStatusClass = (status) => {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("published") || normalized.includes("active")) return "published";
  if (normalized.includes("pending") || normalized.includes("review")) return "pending";
  if (normalized.includes("draft")) return "draft";
  return "default";
};

const InfoRow = ({ label, children }) => (
  <div className="info-row">
    <span>{label}</span>
    <i>:</i>
    <strong>{children}</strong>
  </div>
);

const ViewInstructorModal = ({ instructor, courses = [], isLoading, error, onClose }) => {
  if (!instructor) return null;

  const fullName = instructor.fullName || instructor.name || "Unknown instructor";
  const courseItems = Array.isArray(instructor.courses) ? instructor.courses : courses;
  const avatar = instructor.avatar;
  const coverImage = instructor.coverImage || defaultCover;

  return (
    <div className="instructor-view-overlay" onClick={onClose} role="presentation">
      <div
        className="instructor-view-modal"
        role="dialog"
        aria-modal="true"
        aria-label="View Instructor"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="view-header">
          <h2>View Instructor</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {error ? <div className="instructor-view-error">{error}</div> : null}

        <div className="profile-section">
          <div className="cover-image">
            <img src={coverImage} alt="" />
          </div>

          <div className="profile-info">
            <div className="avatar-box">
              {avatar ? <img src={avatar} alt={fullName} /> : <span>{getInitials(fullName)}</span>}
            </div>

            <div className="basic-profile">
              <h3>{fullName}</h3>
              <p>
                <Mail size={14} />
                {valueOrDash(instructor.email)}
              </p>
              <p>
                <Phone size={14} />
                {valueOrDash(instructor.phone)}
              </p>
            </div>

            <div className="profile-extra">
              <div className="info-card">
                <label>Instructor ID</label>
                <span>{valueOrDash(instructor.instructorCode || instructor.id)}</span>
              </div>
              <div className="info-card">
                <label>Joined Date</label>
                <span>{formatDate(instructor.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="information-card">
            <h4>
              <span><UserRound size={17} /></span>
              Basic Information
            </h4>

            <InfoRow label="Full Name">{fullName}</InfoRow>
            <InfoRow label="Email">{valueOrDash(instructor.email)}</InfoRow>
            <InfoRow label="Phone">{valueOrDash(instructor.phone)}</InfoRow>
            <InfoRow label="Gender">{valueOrDash(instructor.gender)}</InfoRow>
            <InfoRow label="Is Deleted">{instructor.isDeleted ? "Yes" : "No"}</InfoRow>
            <InfoRow label="Date Of Birth">{formatDate(instructor.dateOfBirth)}</InfoRow>
            <InfoRow label="Created At">{formatDateTime(instructor.createdAt)}</InfoRow>
            <InfoRow label="Updated At">{formatDateTime(instructor.updatedAt)}</InfoRow>
          </div>

          <div className="statistics-card">
            <h4>
              <span><BarChart3 size={17} /></span>
              Teaching Statistics
            </h4>

            <div className="stat-grid">
              <div className="stat-box">
                <span className="stat-icon stat-icon-blue"><BookOpen size={26} /></span>
                <p>Managed Courses</p>
                <h2>{formatCount(instructor.numberOfClasses ?? instructor.classes)}</h2>
              </div>
              <div className="stat-box">
                <span className="stat-icon stat-icon-green"><Users size={26} /></span>
                <p>Total Students</p>
                <h2>{formatCount(instructor.totalStudents ?? instructor.students)}</h2>
              </div>
              <div className="stat-box">
                <span className="stat-icon stat-icon-purple"><CircleDollarSign size={26} /></span>
                <p>Total Revenue</p>
                <h2>{formatMoney(instructor.totalRevenue)}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="course-section">
          <h4>
            <span><BookOpen size={17} /></span>
            Courses Of This Instructor ({courseItems.length})
          </h4>

          <div className="course-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Students</th>
                  <th>Rating</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Published At</th>
                </tr>
              </thead>

              <tbody>
                {courseItems.length > 0 ? (
                  courseItems.map((course) => {
                    const status = prettifyStatus(course.status);

                    return (
                      <tr key={course.id || course.courseId || course.title}>
                        <td>
                          <div className="course-cell">
                            {course.thumbnailKey ? (
                              <img src={course.thumbnailKey} alt={course.title || "Course"} />
                            ) : (
                              <span className="course-thumb-fallback">AI</span>
                            )}
                            <strong>{valueOrDash(course.title || course.courseName)}</strong>
                          </div>
                        </td>
                        <td>{valueOrDash(course.category || course.categoryName)}</td>
                        <td>{formatCount(course.students || course.totalStudents)}</td>
                        <td>
                          <span className="rating-cell">
                            <Star size={14} fill="currentColor" />
                            {Number(course.rating || 0).toFixed(1)}
                          </span>
                        </td>
                        <td>{formatMoney(course.price || course.basePrice)}</td>
                        <td>
                          <span className={`course-status ${getCourseStatusClass(course.status)}`}>
                            {status}
                          </span>
                        </td>
                        <td>{formatDate(course.publishedAt)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-course-row">
                      {isLoading ? "Đang tải chi tiết..." : "Chưa có dữ liệu khóa học từ backend."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="view-footer">
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewInstructorModal;
