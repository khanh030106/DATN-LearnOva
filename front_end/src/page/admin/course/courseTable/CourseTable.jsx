import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Info,
  List,
  MessageSquare,
  PlayCircle,
  Star,
  Tag,
  Users,
  BarChart2,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  DollarSign,
  X,
} from "lucide-react";
import "./CourseTable.css";

const pageSize = 10;

const valueOrDash = (value) => {
  if (value === null || value === undefined || value === "") return "--";
  return value;
};

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") return "--";
  const price = Number(value || 0);
  if (price === 0) return "Free";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatCount = (value) => new Intl.NumberFormat("vi-VN").format(Number(value) || 0);

const formatDuration = (seconds) => {
  const totalSeconds = Number(seconds || 0);
  if (!totalSeconds) return "--";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
};

const timeAgo = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("vi-VN");
};

const getCourseDisplayStatus = (course) => course.status || "N/A";

const detailTabs = [
  { id: "overview", label: "Overview", Icon: BarChart2 },
  { id: "description", label: "Description", Icon: FileText },
  { id: "curriculum", label: "Curriculum", Icon: List },
];

const CourseViewModal = ({ course, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const firstSectionId = course?.sections?.[0]?.sectionId;
    setActiveTab("overview");
    setExpandedSections(firstSectionId ? { [firstSectionId]: true } : {});
  }, [course?.id]);

  if (!course) return null;

  const sections = Array.isArray(course.sections) ? course.sections : [];
  const lessonCount = course.lessonCount ?? sections.reduce((total, section) => total + (section.lessons?.length || 0), 0);
  const title = course.title || "Untitled course";
  const status = getCourseDisplayStatus(course);
  const isDeleted = status === "DELETED";
  const isPublished = status === "PUBLISHED";
  const categoryName = course.categoryName || "--";
  const totalDurationSeconds = course.totalDurationSeconds ?? 0;

  const toggleSection = (sectionId) => {
    setExpandedSections((current) => ({ ...current, [sectionId]: !current[sectionId] }));
  };

  return (
    <div className="cdm-overlay adminCourseDetailOverlay" role="presentation" onClick={onClose}>
      <div className="cdm adminCourseDetailModal" role="dialog" aria-modal="true" aria-label="View Course" onClick={(event) => event.stopPropagation()}>
        <div className="cdm__thumbnail-wrap">
          {course.thumbnailKey ? (
            <img src={course.thumbnailKey} alt={title} className="cdm__thumbnail-img" />
          ) : (
            <div className="cdm__thumbnail-placeholder">
              <BookOpen size={40} />
              <span>No thumbnail</span>
            </div>
          )}
          <button type="button" className="cdm__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="cdm__header-info">
          <div className="cdm__badges">
            <span className={`cdm__badge cdm__badge--${isDeleted ? "inactive" : "active"}`}>
              <Circle size={7} fill="currentColor" />
              {isDeleted ? "Inactive" : "Active"}
            </span>
            <span className={`cdm__badge cdm__badge--${isPublished ? "published" : "draft"}`}>
              {status}
            </span>
            {course.level ? (
              <span className="cdm__badge cdm__badge--level">
                <GraduationCap size={11} />
                {course.level}
              </span>
            ) : null}
            {course.language ? (
              <span className="cdm__badge cdm__badge--lang">
                <Globe size={11} />
                {course.language}
              </span>
            ) : null}
          </div>
          <h2 className="cdm__title">{title}</h2>
          <p className="cdm__category">
            <Tag size={13} />
            {categoryName}
          </p>
        </div>

        <div className="cdm__tabs">
          {detailTabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`cdm__tab${activeTab === id ? " cdm__tab--active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="cdm__body">
          <>
              {activeTab === "overview" ? (
                <div className="cdm__tab-content">
                  <div className="cdm__stats-grid">
                    {[
                      { Icon: Users, color: "blue", label: "Students", value: valueOrDash(course.studentCount) },
                      { Icon: Clock, color: "green", label: "Duration", value: formatDuration(totalDurationSeconds) },
                      { Icon: BookOpen, color: "violet", label: "Lessons", value: formatCount(lessonCount) },
                      { Icon: Star, color: "gold", label: "Rating", value: valueOrDash(course.rating) },
                      { Icon: DollarSign, color: "teal", label: "Price", value: formatPrice(course.basePrice) },
                      { Icon: MessageSquare, color: "orange", label: "Reviews", value: valueOrDash(course.reviewCount) },
                    ].map(({ Icon, color, label, value }) => (
                      <div key={label} className="cdm__stat-card">
                        <div className={`cdm__stat-icon cdm__stat-icon--${color}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cdm__info-table">
                    {[
                      ["Instructor", course.instructorName || "--"],
                      ["Level", course.level || "--"],
                      ["Language", course.language || "--"],
                      ["Category", categoryName],
                      ["Sections", sections.length || "--"],
                      ["Status", status],
                      ["Created", timeAgo(course.publishedAt)],
                    ].map(([key, value]) => (
                      <div key={key} className="cdm__info-row">
                        <span>{key}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeTab === "description" ? (
                <div className="cdm__tab-content">
                  {course.description ? (
                    <section className="cdm__section">
                      <h3 className="cdm__section-title">Description</h3>
                      <p className="cdm__description">{course.description}</p>
                    </section>
                  ) : (
                    <div className="cdm__empty">No description added yet.</div>
                  )}

                  {(course.whatYouLearn || []).filter(Boolean).length > 0 ? (
                    <section className="cdm__section">
                      <h3 className="cdm__section-title">What You'll Learn</h3>
                      <ul className="cdm__learn-list">
                        {course.whatYouLearn.filter(Boolean).map((item, index) => (
                          <li key={`${item}-${index}`}>
                            <CheckCircle size={15} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {(course.requirements || []).filter(Boolean).length > 0 ? (
                    <section className="cdm__section">
                      <h3 className="cdm__section-title">Requirements</h3>
                      <ul className="cdm__req-list">
                        {course.requirements.filter(Boolean).map((item, index) => (
                          <li key={`${item}-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>
              ) : null}

              {activeTab === "curriculum" ? (
                <div className="cdm__tab-content">
                  {sections.length > 0 ? (
                    <>
                      <p className="cdm__curriculum-summary">
                        {sections.length} section{sections.length !== 1 ? "s" : ""} · {lessonCount} lesson{lessonCount !== 1 ? "s" : ""} · {formatDuration(totalDurationSeconds)} total
                      </p>
                      <div className="cdm__curriculum">
                        {sections.map((section) => (
                          <div key={section.sectionId || section.title} className="cdm__section-block">
                            <button
                              type="button"
                              className="cdm__section-header"
                              onClick={() => toggleSection(section.sectionId || section.title)}
                            >
                              <span className="cdm__section-chevron">
                                {expandedSections[section.sectionId || section.title] ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                              </span>
                              <span className="cdm__section-name">
                                Section {valueOrDash(section.sectionOrder)}: {valueOrDash(section.title)}
                              </span>
                              <span className="cdm__section-count">
                                {section.lessons?.length || 0} lesson{section.lessons?.length === 1 ? "" : "s"}
                              </span>
                            </button>

                            {expandedSections[section.sectionId || section.title] ? (
                              <div className="cdm__lessons">
                                {(section.lessons || []).map((lesson) => (
                                  <div key={lesson.lessonId || lesson.title} className="cdm__lesson">
                                    <span className="cdm__lesson-icon">
                                      {lesson.videoKey ? <PlayCircle size={14} /> : <FileText size={14} />}
                                    </span>
                                    <span className="cdm__lesson-title">
                                      {valueOrDash(lesson.lessonOrder)}. {valueOrDash(lesson.title)}
                                    </span>
                                    {lesson.durationSeconds ? (
                                      <span className="cdm__lesson-duration">
                                        <Clock size={11} />
                                        {formatDuration(lesson.durationSeconds)}
                                      </span>
                                    ) : null}
                                    {lesson.isPreview ? <span className="cdm__lesson-preview">Preview</span> : null}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="cdm__empty">No curriculum added yet.</div>
                  )}
                </div>
              ) : null}

            </>
        </div>

        <div className="cdm__footer">
          <button type="button" className="cdm__btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseTable = ({
  courses = [],
  loading,
  error,
  onViewCourse,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loadingDetailId, setLoadingDetailId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(courses.length / pageSize));
  const currentPageItems = useMemo(
    () => courses.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [courses, currentPage],
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [courses]);

  const closeCourseDetails = () => {
    setSelectedCourse(null);
  };

  const openCourseDetails = async (course) => {
    if (!onViewCourse) {
      setSelectedCourse(course);
      return;
    }

    setLoadingDetailId(course.id);
    try {
      const detailCourse = await onViewCourse(course);
      setSelectedCourse(detailCourse);
    } catch {
      setSelectedCourse(course);
    } finally {
      setLoadingDetailId(null);
    }
  };

  return (
    <section className="courseTableSection" aria-label="Course Management Table">
      <div className="courseTableCard">
        <table className="courseTable" aria-label="Course List">
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Category</th>
              <th>Level</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="courseTableEmpty" colSpan="7">Loading...</td></tr>
            ) : error ? (
              <tr><td className="courseTableEmpty" colSpan="7">{error}</td></tr>
            ) : currentPageItems.length === 0 ? (
              <tr><td className="courseTableEmpty" colSpan="7">No courses found.</td></tr>
            ) : (
              currentPageItems.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="courseTableCourseCell">
                      {course.thumbnailKey ? <img src={course.thumbnailKey} alt={course.title} /> : null}
                      <div>
                        <strong>{course.title}</strong>
                        <span>{course.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td>{course.instructorName || "N/A"}</td>
                  <td>{course.categoryName || "N/A"}</td>
                  <td>{course.level || "N/A"}</td>
                  <td>{formatPrice(course.basePrice)}</td>
                  <td>
                    <span className={`courseStatusBadge courseStatusBadge--${getCourseDisplayStatus(course).toLowerCase()}`}>
                      {getCourseDisplayStatus(course)}
                    </span>
                  </td>
                  <td>
                    <div className="courseTableActions">
                      <button
                        type="button"
                        className="actionButton actionButton--view"
                        aria-label="View Course Details"
                        title="View Details"
                        disabled={loadingDetailId === course.id}
                        onClick={() => openCourseDetails(course)}
                      >
                        <Info className="actionIcon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="courseTablePagination">
        <button className="paginationButton" type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            type="button"
            className={`paginationButton ${currentPage === i + 1 ? "paginationButton--active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className="paginationButton" type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
          Next
        </button>
      </div>

      {selectedCourse ? (
        <CourseViewModal
          course={selectedCourse}
          onClose={closeCourseDetails}
        />
      ) : null}
    </section>
  );
};

export default CourseTable;
