import { CheckCircle, EyeOff } from "lucide-react";

const actionCopy = {
  approve: {
    icon: CheckCircle,
    title: "Approve course?",
    description: "This course will be published and become visible to learners.",
    confirmLabel: "Approve",
    loadingLabel: "Approving...",
    iconClassName: "approvalConfirmIcon approvalConfirmIcon--approve",
    buttonClassName: "approvalBtnApprove",
  },
  hide: {
    icon: EyeOff,
    title: "Hide course?",
    description: "This course will be hidden from public course listings.",
    confirmLabel: "Hide",
    loadingLabel: "Hiding...",
    iconClassName: "approvalConfirmIcon approvalConfirmIcon--hide",
    buttonClassName: "approvalBtnHide",
  },
};

const ApprovalConfirmModal = ({ action, courseTitle, isSubmitting, onConfirm, onCancel }) => {
  const copy = actionCopy[action] ?? actionCopy.approve;
  const Icon = copy.icon;

  return (
    <div className="approvalBackdrop" role="presentation" onClick={onCancel}>
      <div
        className="approvalConfirmModal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={copy.iconClassName}>
          <Icon size={32} />
        </div>

        <h2 className="approvalConfirmTitle">{copy.title}</h2>
        <p className="approvalConfirmDesc">
          <strong>{courseTitle}</strong>
          <br />
          {copy.description}
        </p>

        <div className="approvalConfirmActions">
          <button
            type="button"
            className="approvalBtnCancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={copy.buttonClassName}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? copy.loadingLabel : copy.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalConfirmModal;
