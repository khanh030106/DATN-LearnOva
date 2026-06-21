import { useEffect, useMemo, useState } from "react";
import { Edit3, Eye, Trash2, X } from "lucide-react";
import {
  createAdminCourseApi,
  deleteAdminCourseApi,
  restoreAdminCourseApi,
  updateAdminCourseApi,
} from "../../../../api/admin/CourseApi.js";
import "./CourseTable.css";

const pageSize = 10;

const emptyForm = {
  thumbnailUrl: "",
  title: "",
  slug: "",
  description: "",
  language: "vi",
  requirements: "",
  whatYouLearn: "",
  basePrice: 0,
  level: "Beginner",
  status: "DRAFT",
  visibility: "visible",
  instructorId: "",
};

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatPrice = (value) => {
  const price = Number(value || 0);
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const linesToArray = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const getInstructorId = (instructor) => instructor.instructorId ?? instructor.id;

const getInstructorName = (instructor) =>
  instructor.fullName || instructor.email || `Instructor #${getInstructorId(instructor)}`;

const getCourseDisplayStatus = (course) =>
  Boolean(course.isDeleted) ? "DELETED" : course.status || "N/A";

const toFormData = (course) => ({
  thumbnailUrl: course.thumbnailUrl || "",
  title: course.title || "",
  slug: course.slug || "",
  description: course.description || "",
  language: course.language || "vi",
  requirements: (course.requirements || []).join("\n"),
  whatYouLearn: (course.whatYouLearn || []).join("\n"),
  basePrice: course.basePrice ?? 0,
  level: course.level || "Beginner",
  status: course.status === "DELETED" ? "ARCHIVED" : course.status || "DRAFT",
  visibility: course.isDeleted ? "hidden" : "visible",
  instructorId: course.instructorId ? String(course.instructorId) : "",
});

const buildPayload = (form) => ({
  thumbnailUrl: form.thumbnailUrl.trim(),
  title: form.title.trim(),
  slug: form.slug.trim(),
  description: form.description.trim(),
  language: form.language.trim() || "vi",
  requirements: linesToArray(form.requirements),
  whatYouLearn: linesToArray(form.whatYouLearn),
  basePrice: Number(form.basePrice || 0),
  level: form.level,
  status: form.status,
  instructorId: Number(form.instructorId),
});

const CourseViewModal = ({ course, onClose }) => (
  <div className="courseModalBackdrop" role="presentation" onClick={onClose}>
    <div
      className="courseModal"
      role="dialog"
      aria-modal="true"
      aria-label="Course details"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="courseModalHeader">
        <div>
          <p className="courseModalEyebrow">COURSE DETAIL</p>
          <h2>{course.title}</h2>
        </div>
        <button type="button" className="courseModalClose" onClick={onClose} aria-label="Close course details">
          <X size={20} />
        </button>
      </div>

      <div className="courseModalBody">
        {course.thumbnailUrl ? (
          <img className="courseModalThumbnail" src={course.thumbnailUrl} alt={course.title} />
        ) : null}
        <p><strong>Instructor:</strong> {course.instructorName || "N/A"}</p>
        <p><strong>Slug:</strong> {course.slug || "N/A"}</p>
        <p><strong>Level:</strong> {course.level || "N/A"}</p>
        <p><strong>Status:</strong> {getCourseDisplayStatus(course)}</p>
        <p><strong>Language:</strong> {course.language || "N/A"}</p>
        <p><strong>Published At:</strong> {formatDate(course.publishedAt)}</p>
        <p><strong>Price:</strong> {formatPrice(course.basePrice)}</p>
        <p><strong>Description:</strong> {course.description || "N/A"}</p>

        <div className="courseModalListSection">
          <h3>Requirements</h3>
          <ul>{(course.requirements || []).map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>

        <div className="courseModalListSection">
          <h3>What You Learn</h3>
          <ul>{(course.whatYouLearn || []).map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>
      </div>
    </div>
  </div>
);

const CourseFormModal = ({
  course,
  instructors,
  axiosClient,
  onClose,
  onSaved,
}) => {
  const isEdit = Boolean(course);
  const [form, setForm] = useState(() => toFormData(course || emptyForm));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const hasInstructorOptions = instructors.length > 0;

  useEffect(() => {
    if (!form.instructorId && instructors.length > 0) {
      setForm((current) => ({
        ...current,
        instructorId: String(getInstructorId(instructors[0])),
      }));
    }
  }, [form.instructorId, instructors]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasInstructorOptions) {
      setError("Chưa có instructor để gán cho khóa học. Hãy kiểm tra dữ liệu instructor hoặc role ROLE_TEACHER.");
      return;
    }

    if (!form.instructorId) {
      setError("Vui lòng chọn instructor trước khi lưu khóa học.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const payload = buildPayload(form);
      let savedCourse = isEdit
        ? await updateAdminCourseApi(course.id, payload, axiosClient)
        : await createAdminCourseApi(payload, axiosClient);

      if (isEdit && form.visibility === "visible" && savedCourse.isDeleted) {
        savedCourse = await restoreAdminCourseApi(course.id, axiosClient);
      }

      if (isEdit && form.visibility === "hidden" && !savedCourse.isDeleted) {
        await deleteAdminCourseApi(course.id, axiosClient);
        savedCourse = { ...savedCourse, isDeleted: true };
      }

      onSaved(savedCourse);
      onClose();
    } catch (saveError) {
      setError(saveError?.response?.data?.message || "Không lưu được khóa học.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="courseModalBackdrop" role="presentation" onClick={onClose}>
      <form
        className="courseFormModal"
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit course" : "Create course"}
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="courseModalHeader">
          <div>
            <p className="courseModalEyebrow">{isEdit ? "EDIT COURSE" : "ADD COURSE"}</p>
            <h2>{isEdit ? "Update Course" : "Create New Course"}</h2>
          </div>
          <button type="button" className="courseModalClose" onClick={onClose} aria-label="Close course form">
            <X size={20} />
          </button>
        </div>

        <div className="courseFormGrid">
          <label>
            Title
            <input value={form.title} onChange={(event) => setField("title", event.target.value)} required />
          </label>
          <label>
            Slug
            <input value={form.slug} onChange={(event) => setField("slug", event.target.value)} required />
          </label>
          <label className="courseFormWide">
            Thumbnail URL
            <input value={form.thumbnailUrl} onChange={(event) => setField("thumbnailUrl", event.target.value)} required />
          </label>
          <label>
            Instructor
            <select
              value={form.instructorId}
              onChange={(event) => setField("instructorId", event.target.value)}
              required={hasInstructorOptions}
            >
              <option value="">Select instructor</option>
              {instructors.map((instructor) => (
                <option key={getInstructorId(instructor)} value={getInstructorId(instructor)}>
                  {getInstructorName(instructor)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Base Price
            <input
              type="number"
              min="0"
              value={form.basePrice}
              onChange={(event) => setField("basePrice", event.target.value)}
              required
            />
          </label>
          <label>
            Level
            <select value={form.level} onChange={(event) => setField("level", event.target.value)} required>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
          <label>
            Status
            <select value={form.status} onChange={(event) => setField("status", event.target.value)} required>
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </label>
          <label>
            Language
            <input maxLength={10} value={form.language} onChange={(event) => setField("language", event.target.value)} required />
          </label>
          {isEdit ? (
            <label>
              Visibility Status
              <select value={form.visibility} onChange={(event) => setField("visibility", event.target.value)} required>
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
              </select>
            </label>
          ) : null}
          <label className="courseFormWide">
            Description
            <textarea rows={3} value={form.description} onChange={(event) => setField("description", event.target.value)} required />
          </label>
          <label>
            Requirements
            <textarea
              rows={4}
              placeholder="Mỗi dòng là một yêu cầu"
              value={form.requirements}
              onChange={(event) => setField("requirements", event.target.value)}
            />
          </label>
          <label>
            What You Learn
            <textarea
              rows={4}
              placeholder="Mỗi dòng là một nội dung học được"
              value={form.whatYouLearn}
              onChange={(event) => setField("whatYouLearn", event.target.value)}
            />
          </label>
        </div>

        {error ? <p className="courseFormError">{error}</p> : null}

        <div className="courseModalActions">
          <button type="button" className="courseModalCancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="courseModalSubmit" disabled={isSaving}>
            {isSaving ? "Saving..." : isEdit ? "Save Course" : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

const CourseTable = ({
  courses = [],
  loading,
  error,
  instructors = [],
  axiosClient,
  isCreateOpen,
  onCreateClose,
  onCourseCreated,
  onCourseUpdated,
  onCourseDeleted,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(courses.length / pageSize));
  const currentPageItems = useMemo(
    () => courses.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [courses, currentPage],
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleDelete = async (course) => {
    const confirmed = window.confirm(`Xóa khóa học "${course.title}"?`);
    if (!confirmed) return;

    setDeletingCourseId(course.id);
    try {
      await deleteAdminCourseApi(course.id, axiosClient);
      onCourseDeleted(course.id);
    } catch (deleteError) {
      window.alert(deleteError?.response?.data?.message || "Không xóa được khóa học.");
    } finally {
      setDeletingCourseId(null);
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
              <th>Level</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="courseTableEmpty" colSpan="6">Đang tải...</td>
              </tr>
            ) : error ? (
              <tr>
                <td className="courseTableEmpty" colSpan="6">{error}</td>
              </tr>
            ) : currentPageItems.length === 0 ? (
              <tr>
                <td className="courseTableEmpty" colSpan="6">Không có khóa học nào.</td>
              </tr>
            ) : (
              currentPageItems.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="courseTableCourseCell">
                      {course.thumbnailUrl ? <img src={course.thumbnailUrl} alt={course.title} /> : null}
                      <div>
                        <strong>{course.title}</strong>
                        <span>{course.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td>{course.instructorName || "N/A"}</td>
                  <td>{course.level || "N/A"}</td>
                  <td>{formatPrice(course.basePrice)}</td>
                  <td>
                    <span className={`courseStatusBadge courseStatusBadge--${getCourseDisplayStatus(course).toLowerCase()}`}>
                      {getCourseDisplayStatus(course)}
                    </span>
                  </td>
                  <td>
                    <div className="courseTableActions">
                      <button className="actionButton actionButton--view" aria-label="View Course" onClick={() => setSelectedCourse(course)}>
                        <Eye className="actionIcon" />
                      </button>
                      <button className="actionButton actionButton--edit" aria-label="Edit Course" onClick={() => setEditingCourse(course)}>
                        <Edit3 className="actionIcon" />
                      </button>
                      <button
                        className="actionButton actionButton--delete"
                        aria-label="Delete Course"
                        disabled={deletingCourseId === course.id}
                        onClick={() => handleDelete(course)}
                      >
                        <Trash2 className="actionIcon" />
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
        <button className="paginationButton" type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            type="button"
            className={`paginationButton ${currentPage === index + 1 ? "paginationButton--active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className="paginationButton" type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}>
          Next
        </button>
      </div>

      {selectedCourse ? <CourseViewModal course={selectedCourse} onClose={() => setSelectedCourse(null)} /> : null}
      {editingCourse ? (
        <CourseFormModal
          course={editingCourse}
          instructors={instructors}
          axiosClient={axiosClient}
          onClose={() => setEditingCourse(null)}
          onSaved={onCourseUpdated}
        />
      ) : null}
      {isCreateOpen ? (
        <CourseFormModal
          instructors={instructors}
          axiosClient={axiosClient}
          onClose={onCreateClose}
          onSaved={onCourseCreated}
        />
      ) : null}
    </section>
  );
};

export default CourseTable;
