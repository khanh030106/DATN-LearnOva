import { LockKeyhole, Megaphone, X } from "lucide-react";
import { useState } from "react";
import "./ViolationReports.css";

const DEFAULT_WARN_MESSAGE =
  "Vui lòng kiểm tra và cập nhật lại nội dung video bị báo cáo trong thời gian sớm nhất.";

/**
 * Modal thay cho window.prompt / window.confirm.
 * kind: "warn" | "hide"
 */
const ModerationActionModal = ({
  kind,
  report,
  isSubmitting,
  onConfirm,
  onCancel,
}) => {
  const [message, setMessage] = useState(DEFAULT_WARN_MESSAGE);
  const isWarn = kind === "warn";
  const target = report?.lessonTitle
    ? `${report.courseTitle} · ${report.lessonTitle}`
    : report?.courseTitle || "khóa học này";

  return (
    <div className="violation-action-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="violation-action-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="violation-action-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="violation-action-close"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        <div className={`violation-action-icon ${isWarn ? "warn" : "hide"}`}>
          {isWarn ? <Megaphone size={28} /> : <LockKeyhole size={28} />}
        </div>

        <h2 id="violation-action-title">
          {isWarn ? "Gửi thông báo cho giảng viên" : "Ẩn khóa học khỏi học viên"}
        </h2>

        <p className="violation-action-desc">
          {isWarn ? (
            <>
              Hệ thống sẽ gửi thông báo tới giảng viên của{" "}
              <strong>{target}</strong> để họ tự kiểm tra và sửa nội dung video.
            </>
          ) : (
            <>
              Khóa học <strong>{target}</strong> sẽ bị ẩn khỏi danh sách công khai.
              Các báo cáo đang mở của khóa này sẽ được đánh dấu đã xử lý, và giảng viên
              sẽ nhận thông báo.
            </>
          )}
        </p>

        {isWarn ? (
          <label className="violation-action-field">
            <span>Nội dung gửi cho giảng viên</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              disabled={isSubmitting}
              placeholder={DEFAULT_WARN_MESSAGE}
            />
          </label>
        ) : null}

        <div className="violation-action-actions">
          <button
            type="button"
            className="violation-report-btn ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            type="button"
            className={`violation-report-btn${isWarn ? "" : " danger"}`}
            onClick={() => onConfirm(isWarn ? message.trim() : undefined)}
            disabled={isSubmitting || (isWarn && !message.trim())}
          >
            {isSubmitting
              ? isWarn
                ? "Đang gửi…"
                : "Đang ẩn…"
              : isWarn
                ? "Gửi thông báo"
                : "Xác nhận ẩn khóa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModerationActionModal;
export { DEFAULT_WARN_MESSAGE };
