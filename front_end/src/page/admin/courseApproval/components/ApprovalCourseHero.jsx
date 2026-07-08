import { BookOpen, CheckCircle, Clock, EyeOff, FileText } from "lucide-react";

const formatDuration = (seconds) => {
  const totalSeconds = Number(seconds || 0);
  if (totalSeconds <= 0) return "0m";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const formatPrice = (value) => {
  const price = Number(value || 0);
  if (price === 0) return "Free";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const ApprovalCourseHero = ({ course, isSubmitting, onApprove, onHide }) => {
  const isDraft = course.status === "DRAFT";

  const metaItems = [
    ["Instructor", course.instructorName],
    ["Category", course.categoryName],
    ["Level", course.level],
    ["Language", course.language],
    ["Price", formatPrice(course.basePrice)],
    ["Published", formatDate(course.publishedAt)],
  ];

  return (
    <section className="approvalCourseCard">
      <div className="approvalCourseCardTop">
        {course.thumbnailKey ? (
          <img
            className="approvalCourseThumbnail"
            src={course.thumbnailKey}
            alt={course.title}
          />
        ) : (
          <div className="approvalCourseThumbnailPlaceholder">
            <BookOpen size={36} />
          </div>
        )}

        <div className="approvalCourseInfo">
          <div className="approvalCourseInfoTop">
            <span className={`approvalStatusBadge approvalStatusBadge--${course.status.toLowerCase()}`}>
              {course.status}
            </span>

            {isDraft ? (
              <div className="approvalActionButtonsGroup">
                <button
                  type="button"
                  className="approvalBtnApproveMain"
                  onClick={onApprove}
                  disabled={isSubmitting}
                >
                  <CheckCircle size={16} />
                  Approve & Publish
                </button>
                <button
                  type="button"
                  className="approvalBtnHideMain"
                  onClick={onHide}
                  disabled={isSubmitting}
                >
                  <EyeOff size={16} />
                  Hide
                </button>
              </div>
            ) : (
              <span className="approvalAlreadyPublished">
                {course.status === "ARCHIVED" ? <EyeOff size={15} /> : <CheckCircle size={15} />}
                {course.status === "ARCHIVED" ? "Hidden" : "Reviewed"}
              </span>
            )}
          </div>

          <h2 className="approvalCourseTitle">{course.title}</h2>

          <div className="approvalCourseMeta">
            {metaItems.map(([label, value]) => (
              <span key={label}>
                <strong>{label}:</strong> {value || "-"}
              </span>
            ))}
          </div>

          <div className="approvalCourseStats">
            <span className="approvalCourseStat">
              <BookOpen size={14} />
              {course.sections.length} sections
            </span>
            <span className="approvalCourseStat">
              <FileText size={14} />
              {course.lessonCount} lessons
            </span>
            <span className="approvalCourseStat">
              <Clock size={14} />
              {formatDuration(course.totalDurationSeconds)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApprovalCourseHero;
