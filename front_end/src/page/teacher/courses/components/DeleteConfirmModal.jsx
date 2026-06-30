import { AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ courseName, onConfirm, onCancel, isDeleting }) => {
    return (
        <div className="delete-modal-overlay" onClick={onCancel}>
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
                <div className="delete-modal__icon">
                    <AlertTriangle size={32} />
                </div>
                <h2 className="delete-modal__title">Hide Course</h2>
                <p className="delete-modal__body">
                    Are you sure you want to hide <strong>"{courseName}"</strong>?
                    The course will no longer be visible to students.
                </p>
                <div className="delete-modal__actions">
                    <button
                        type="button"
                        className="delete-modal__btn delete-modal__btn--cancel"
                        onClick={onCancel}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="delete-modal__btn delete-modal__btn--confirm"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Hiding..." : "Yes, hide it"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
