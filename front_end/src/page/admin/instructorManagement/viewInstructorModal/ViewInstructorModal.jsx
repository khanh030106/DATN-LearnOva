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

import { useEffect, useState } from "react";
import defaultCover from "../../../../assets/instructors/header-intructor.png";
import "./ViewInstructorModal.css";

const formatCurrency = (value) => {
  const amount = Number(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0);
};

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

const formatNumber = (value) =>
  new Intl.NumberFormat("vi-VN").format(value == null ? 0 : Number(value) || 0);

const valueOrDash = (value) =>
  value === null || value === undefined || value === "" ? "--" : value;

const getInitials = (name) =>
  String(name || "Instructor")
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "I";

const getVisibility = (isDeleted) => (isDeleted ? "Hidden" : "Available");

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

const PanelCard = ({ icon: Icon, title, children, className = "" }) => (
  <div className={`modal-panel-card ${className}`.trim()}>
    <h4>
      <span>
        <Icon size={17} />
      </span>
      {title}
    </h4>
    {children}
  </div>
);

const ViewInstructorModal = ({ instructor, courses = [], isLoading, error, onClose }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [coverError, setCoverError] = useState(false);

  useEffect(() => {
    setAvatarError(false);
    setCoverError(false);
  }, [instructor?.instructorId, instructor?.avatar, instructor?.coverImage]);

  if (!instructor) return null;

  const fullName = instructor.fullName || instructor.name || "Unknown instructor";
  const courseItems = Array.isArray(instructor.courses) ? instructor.courses : courses;
  const avatar = instructor.avatar;
  const coverImage = instructor.coverImage || defaultCover;
  const resolvedCover = coverError ? defaultCover : coverImage;

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
            <img
              src={resolvedCover}
              alt=""
              onError={() => setCoverError(true)}
            />
          </div>

          <div className="profile-info">
            <div className="avatar-box">
              {!avatarError && avatar ? (
                <img
                  src={avatar}
                  alt={fullName}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span>{getInitials(fullName)}</span>
              )}
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
              <p>
                <BookOpen size={14} />
                {valueOrDash(instructor.specialization || instructor.category)}
              </p>
            </div>

            <div className="profile-extra">
              <div className="info-card">
                <label>Instructor ID</label>
                <span>{valueOrDash(instructor.instructorCode || instructor.id)}</span>
              </div>
              <div className="info-card">
                <label>Created At</label>
                <span>{formatDate(instructor.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <PanelCard icon={UserRound} title="Basic Information" className="modal-panel-card--info">
            <InfoRow label="Full Name">{fullName}</InfoRow>
            <InfoRow label="Email">{valueOrDash(instructor.email)}</InfoRow>
            <InfoRow label="Phone">{valueOrDash(instructor.phone)}</InfoRow>
            <InfoRow label="Specialization">{valueOrDash(instructor.specialization || instructor.category)}</InfoRow>
            <InfoRow label="Gender">{valueOrDash(instructor.gender)}</InfoRow>
            <InfoRow label="Visibility">{getVisibility(instructor.isDeleted)}</InfoRow>
            <InfoRow label="Date Of Birth">{formatDate(instructor.dateOfBirth)}</InfoRow>
            <InfoRow label="Created At">{formatDateTime(instructor.createdAt)}</InfoRow>
            <InfoRow label="Updated At">{formatDateTime(instructor.updatedAt)}</InfoRow>
          </PanelCard>

          <PanelCard icon={BarChart3} title="Teaching Statistics" className="modal-panel-card--stats">
            <div className="stat-grid">
              <div className="stat-box">
                <span className="stat-icon stat-icon-blue"><BookOpen size={26} /></span>
                <p>Managed Courses</p>
                <h2>{formatNumber(instructor.numberOfClasses ?? instructor.displayClasses)}</h2>
              </div>
              <div className="stat-box">
                <span className="stat-icon stat-icon-green"><Users size={26} /></span>
                <p>Total Students</p>
                <h2>{formatNumber(instructor.totalStudents)}</h2>
              </div>
              <div className="stat-box">
                <span className="stat-icon stat-icon-purple"><CircleDollarSign size={26} /></span>
                <p>Total Revenue</p>
                <h2>{formatCurrency(instructor.totalRevenue)}</h2>
              </div>
            </div>
          </PanelCard>
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
                              <img src={course.thumbnailUrl || course.thumbnailKey} alt={course.title || "Course"} />
                            ) : (
                              <span className="course-thumb-fallback">AI</span>
                            )}
                            <strong>{valueOrDash(course.title || course.courseName)}</strong>
                          </div>
                        </td>
                        <td>{valueOrDash(course.category || course.categoryName)}</td>
                        <td>{formatNumber(course.students ?? course.totalStudents)}</td>
                        <td>
                          <span className="rating-cell">
                            <Star size={14} fill="currentColor" />
                            {Number(course.rating || 0).toFixed(1)}
                          </span>
                        </td>
                        <td>{formatCurrency(course.price || course.basePrice)}</td>
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
                      {isLoading ? "Loading details..." : "No course data returned from the backend yet."}
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
