import { useEffect, useState } from "react";
import { FaFlag, FaTimes } from "react-icons/fa";
import "./ReportCourseModal.css";

const REASON_OPTIONS = [
  { value: "MISLEADING_CONTENT", label: "Misleading / false information" },
  { value: "SENSITIVE_CONTENT", label: "Sensitive / inappropriate content" },
  { value: "SPAM", label: "Spam / advertising" },
  { value: "COPYRIGHT", label: "Copyright violation" },
  { value: "OTHER", label: "Other" },
];

function ReportCourseModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  const [reason, setReason] = useState("MISLEADING_CONTENT");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReason("MISLEADING_CONTENT");
      setDescription("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason === "OTHER" && !description.trim()) {
      setError("Please describe the issue when selecting Other.");
      return;
    }
    setError("");
    onSubmit({ reason, description: description.trim() });
  };

  return (
    <div className="report-course-modal-overlay" onClick={onClose}>
      <div
        className="report-course-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-course-title"
      >
        <button
          type="button"
          className="report-course-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="report-course-modal-header">
          <span className="report-course-modal-icon">
            <FaFlag />
          </span>
          <h3 id="report-course-title">Report this course</h3>
        </div>

        <p className="report-course-modal-subtitle">
          Tell us if this course contains false information or sensitive content.
          Admins will review your report.
        </p>

        <form onSubmit={handleSubmit}>
          <fieldset className="report-course-reasons">
            <legend>Reason</legend>
            {REASON_OPTIONS.map((option) => (
              <label key={option.value} className="report-course-reason-option">
                <input
                  type="radio"
                  name="report-reason"
                  value={option.value}
                  checked={reason === option.value}
                  onChange={() => setReason(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>

          <label className="report-course-desc-label" htmlFor="report-description">
            Description {reason === "OTHER" ? "(required)" : "(optional)"}
          </label>
          <textarea
            id="report-description"
            className="report-course-textarea"
            placeholder="Describe the problem..."
            value={description}
            maxLength={500}
            rows={4}
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value.trim()) setError("");
            }}
          />
          <div className="report-course-char-count">{description.length}/500</div>

          {error && <div className="report-course-error">{error}</div>}

          <div className="report-course-actions">
            <button type="button" className="report-course-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="report-course-btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportCourseModal;
