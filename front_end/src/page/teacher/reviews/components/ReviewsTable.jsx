import { reviewsTableColumns } from "../reviewsPageData.js";
import ReviewRow from "./ReviewRow.jsx";

const ReviewsTable = ({ reviews }) => (
  <div className="teacher-reviews-panel">
    <div className="teacher-reviews-table-head">
      {reviewsTableColumns.map((column) => (
        <span key={column}>{column}</span>
      ))}
    </div>

    {reviews.length === 0 ? (
      <div className="teacher-reviews-empty">Chưa có đánh giá nào cho khóa học của bạn.</div>
    ) : (
      reviews.map((review) => <ReviewRow key={review.reviewId} review={review} />)
    )}
  </div>
);

export default ReviewsTable;
