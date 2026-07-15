import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, Pin, PinOff, Reply, Send } from "lucide-react";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

const QARow = ({ question, onToggleSolved, onTogglePinned, onAnswer }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      await onAnswer(question, replyText.trim());
      setReplyText("");
      setIsReplying(false);
    } catch {
      // error toast already shown by the parent; keep the draft so the teacher can retry
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="teacher-qa-row-wrapper">
      <div className="teacher-qa-row">
        <div className="teacher-qa-row__profile">
          <strong>{question.userName}</strong>
        </div>

        <div className="teacher-qa-row__course">
          <Link to={`/learnova/courses/detail/${question.courseId}`}>{question.courseTitle}</Link>
          <span className="teacher-qa-row__lesson">{question.lessonTitle}</span>
        </div>

        <div className="teacher-qa-row__body">
          <p className="teacher-qa-row__content">{question.content}</p>
          <span className="teacher-qa-row__answer-count">
            <MessageCircle size={13} />
            {question.answerCount} phản hồi
          </span>
        </div>

        <div className="teacher-qa-row__status">
          <button
            className={`teacher-qa-row__solved-btn ${question.isSolved ? "is-solved" : ""}`}
            onClick={() => onToggleSolved(question)}
          >
            <CheckCircle2 size={14} />
            {question.isSolved ? "Đã giải quyết" : "Chưa giải quyết"}
          </button>
          <button
            className={`teacher-qa-row__pin-btn ${question.isPinned ? "is-pinned" : ""}`}
            onClick={() => onTogglePinned(question)}
          >
            {question.isPinned ? <PinOff size={14} /> : <Pin size={14} />}
            {question.isPinned ? "Bỏ ghim" : "Ghim"}
          </button>
          <button
            className={`teacher-qa-row__reply-btn ${isReplying ? "is-active" : ""}`}
            onClick={() => setIsReplying((v) => !v)}
          >
            <Reply size={14} />
            Trả lời
          </button>
        </div>

        <div className="teacher-qa-row__date">
          <time>{formatDate(question.createdAt)}</time>
        </div>
      </div>

      {isReplying && (
        <div className="teacher-qa-reply-panel">
          <textarea
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Viết câu trả lời của bạn..."
            autoFocus
          />
          <div className="teacher-qa-reply-actions">
            <button
              type="button"
              onClick={() => {
                setIsReplying(false);
                setReplyText("");
              }}
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="button"
              className="teacher-qa-reply-submit-btn"
              onClick={handleSubmitReply}
              disabled={isSubmitting || !replyText.trim()}
            >
              <Send size={14} />
              {isSubmitting ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QARow;
