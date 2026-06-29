import React, { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import "./ReviewModal.css";

function ReviewModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1) return;
    onSubmit({ rating, comment });
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-content">
        <button className="review-modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="congrats-badge">🎉</div>
        <h3 className="review-modal-title">Chúc mừng hoàn thành khóa học!</h3>
        <p className="review-modal-subtitle">
          Bạn đã xuất sắc hoàn thành tất cả bài học. Hãy chia sẻ cảm nhận và đánh giá của bạn về khóa học này nhé!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="stars-rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`star-icon ${(hoverRating || rating) >= star ? "filled" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>

          <textarea
            className="review-textarea"
            placeholder="Nhập nhận xét của bạn về khóa học..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <div className="review-modal-actions">
            <button type="button" className="btn-cancel-review" onClick={onClose}>
              Đánh giá sau
            </button>
            <button type="submit" className="btn-submit-review" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
