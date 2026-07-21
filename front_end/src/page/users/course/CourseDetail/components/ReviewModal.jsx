import React, { useState, useEffect } from "react";
import { FaStar, FaTimes, FaRegCheckCircle } from "react-icons/fa";
import "../css/ReviewModal.css";

function ReviewModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRating(5);
      setComment("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1) {
      setError("Please select a star rating (from 1 to 5).");
      return;
    }
    if (!comment.trim()) {
      setError("The review content must not be left blank.");
      return;
    }
    setError("");
    onSubmit({ rating, comment });
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-content">
        <button className="review-modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="congrats-badge">
          <FaRegCheckCircle className="congrats-icon" />
          <h3 className="review-modal-title">Congratulations on completing the course!</h3>
        </div>

        <p className="review-modal-subtitle">
          You have successfully completed all the lessons. Please share your thoughts and feedback on this course!
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
            placeholder="Enter your comments about the course..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (e.target.value.trim()) {
                setError("");
              }
            }}
            rows={4}
          />

          {error && (
            <div className="review-error-message">
              {error}
            </div>
          )}

          <div className="review-modal-actions">
            <button type="button" className="btn-cancel-review" onClick={onClose}>
              Post-assessment
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
