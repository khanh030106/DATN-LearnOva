import { AlertTriangle, Trash2, X } from "lucide-react";
import "./ViewInstructorModal.css";

const DeleteInstructorModal = ({ instructor, isDeleting, error, onClose, onConfirm }) => {
  if (!instructor) return null;

  return (
    <div className="instructor-view-overlay" onClick={onClose} role="presentation">
      <div
        className="delete-instructor-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Delete Instructor"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="delete-instructor-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="delete-instructor-icon" aria-hidden="true">
          <AlertTriangle />
        </div>

        <p className="delete-instructor-eyebrow">DELETE INSTRUCTOR</p>
        <h2>Confirm deletion</h2>
        <p className="delete-instructor-message">
          Are you sure you want to delete <strong>{instructor.name}</strong>? This will mark
          this instructor account as deleted.
        </p>

        <div className="delete-instructor-summary">
          <div>
            <span>Email</span>
            <strong>{instructor.email || "--"}</strong>
          </div>
          <div>
            <span>Instructor ID</span>
            <strong>{instructor.id || instructor.instructorCode || "--"}</strong>
          </div>
        </div>

        {error ? <p className="instructor-form-error">{error}</p> : null}

        <div className="delete-instructor-actions">
          <button type="button" className="instructor-form-secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="delete-instructor-confirm" onClick={onConfirm} disabled={isDeleting}>
            <Trash2 size={17} />
            {isDeleting ? "Deleting..." : "Delete Instructor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInstructorModal;
