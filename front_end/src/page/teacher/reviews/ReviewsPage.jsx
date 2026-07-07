import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import ReviewsTable from "./components/ReviewsTable.jsx";
import ReviewsToolbar from "./components/ReviewsToolbar.jsx";
import { getMyReviews } from "../../../api/teacher/CourseApi.js";
import "./ReviewsPage.css";

const filterReviews = (reviews, query, ratingFilter) => {
  const q = query.trim().toLowerCase();
  return reviews.filter((review) => {
    const matchesQuery =
      !q ||
      [review.userName, review.courseTitle, review.comment]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const matchesRating = ratingFilter === "all" || review.rating === Number(ratingFilter);
    return matchesQuery && matchesRating;
  });
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    getMyReviews()
      .then(setReviews)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filteredReviews = useMemo(
    () => filterReviews(reviews, query, ratingFilter),
    [reviews, query, ratingFilter]
  );

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  if (isLoading) {
    return (
      <section className="teacher-page teacher-reviews-page">
        <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
          Loading reviews...
        </div>
      </section>
    );
  }

  return (
    <section className="teacher-page teacher-reviews-page">
      <div className="teacher-reviews-summary">
        <div className="teacher-reviews-summary__item">
          <Star size={20} fill="#ff9800" color="#ff9800" />
          <strong>{averageRating.toFixed(1)}</strong>
          <span>Đánh giá trung bình</span>
        </div>
        <div className="teacher-reviews-summary__item">
          <strong>{reviews.length}</strong>
          <span>Tổng số đánh giá</span>
        </div>
      </div>

      <ReviewsToolbar
        query={query}
        onQueryChange={setQuery}
        ratingFilter={ratingFilter}
        onRatingFilterChange={setRatingFilter}
      />
      <ReviewsTable reviews={filteredReviews} />
    </section>
  );
};

export default ReviewsPage;
