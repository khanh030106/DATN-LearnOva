import { Star } from "lucide-react";
import { formatReviewDate } from "../reviewsPageData.js";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=1d4ed8&color=fff&name=Student";

const ReviewRow = ({ review }) => (
  <article className="teacher-review-row">
    <div className="teacher-review-row__profile">
      <img src={review.avatar || DEFAULT_AVATAR} alt={review.userName} />
      <div>
        <strong>{review.userName}</strong>
      </div>
    </div>

    <div className="teacher-review-row__course">
      <span>{review.courseTitle}</span>
    </div>

    <div className="teacher-review-row__rating">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < review.rating ? "#ff9800" : "none"}
          color="#ff9800"
        />
      ))}
    </div>

    <p className="teacher-review-row__comment">{review.comment || "-"}</p>

    <time className="teacher-review-row__date">{formatReviewDate(review.createdAt)}</time>
  </article>
);

export default ReviewRow;
