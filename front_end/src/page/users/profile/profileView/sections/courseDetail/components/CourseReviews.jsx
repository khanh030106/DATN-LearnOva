import { Star } from "lucide-react";

const CourseReviews = ({ course }) => (
  <section className="learning-content-panel learning-review-panel">
    <div className="learning-review-summary">
      <strong>{course.rating}</strong>
      <div>
        <div>
          {[1, 2, 3, 4, 5].map((item) => (
            <Star key={item} size={18} fill="currentColor" />
          ))}
        </div>
        <p>Dựa trên {course.reviews} đánh giá từ học viên đã tham gia.</p>
      </div>
    </div>

    <div className="learning-review-list">
      {course.reviewsList.map((review) => (
        <article key={review.name}>
          <div>
            <strong>{review.name}</strong>
            <span>{review.score}/5</span>
          </div>
          <p>{review.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default CourseReviews;
