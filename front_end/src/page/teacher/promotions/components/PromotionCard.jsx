import { Pencil, Plus } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

const PromotionCard = ({ course, promotion, onSetPromotion }) => {
  const basePrice = course.basePrice * 24000;
  const discountPrice = promotion ? basePrice * (1 - promotion.percent / 100) : basePrice;

  return (
    <article className="teacher-promotion-card">
      <div className="teacher-promotion-card__media">
        <img src={course.image} alt={course.title} />
        <span className={`teacher-promotion-card__status ${promotion ? "teacher-promotion-card__status--active" : ""}`}>
          {promotion ? "Active" : "No active promotion"}
        </span>
      </div>

      <div className="teacher-promotion-card__body">
        <h2>{course.title}</h2>
        <p>
          {course.modules} Lessons
          <span aria-hidden="true">•</span>
          {course.students}
        </p>

        <div className="teacher-promotion-card__price-row">
          <strong>{formatPrice(discountPrice)}</strong>
          {promotion && (
            <>
              <del>{formatPrice(basePrice)}</del>
              <span>{promotion.percent}% OFF</span>
            </>
          )}
        </div>

        <button type="button" onClick={() => onSetPromotion(course)}>
          {promotion ? <Pencil size={16} /> : <Plus size={16} />}
          {promotion ? "Edit Promotion" : "Set Promotion"}
        </button>
      </div>
    </article>
  );
};

export default PromotionCard;
