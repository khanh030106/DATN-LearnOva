import { useMemo, useState } from "react";
import { CalendarDays, Search, X } from "lucide-react";
import { courses } from "../data/teacherDashboardData.js";
import PromotionCard from "./components/PromotionCard.jsx";
import "./PromotionsPage.css";

const initialPromotions = {
  1: {
    basePrice: 49.99 * 24000,
    percent: 30,
    startDate: "2026-06-01",
    endDate: "2026-06-30",
  },
  3: {
    basePrice: 39.99 * 24000,
    percent: 20,
    startDate: "2026-06-05",
    endDate: "2026-06-25",
  },
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);

const PromotionsPage = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [promotions, setPromotions] = useState(initialPromotions);
  const [formValues, setFormValues] = useState({
    basePrice: "",
    percent: "",
    startDate: "",
    endDate: "",
  });

  const promotionCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const hasPromotion = Boolean(promotions[course.id]);
      const matchesSearch =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && hasPromotion) ||
        (statusFilter === "INACTIVE" && !hasPromotion);

      return !course.isDeleted && matchesSearch && matchesStatus;
    });
  }, [promotions, query, statusFilter]);

  const openPromotionModal = (course) => {
    const existingPromotion = promotions[course.id];

    setSelectedCourse(course);
    setFormValues({
      basePrice: Math.round(existingPromotion?.basePrice ?? course.basePrice * 24000),
      percent: existingPromotion?.percent ?? 15,
      startDate: existingPromotion?.startDate ?? "2026-06-01",
      endDate: existingPromotion?.endDate ?? "2026-06-30",
    });
  };

  const closePromotionModal = () => {
    setSelectedCourse(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCourse) {
      return;
    }

    setPromotions((currentPromotions) => ({
      ...currentPromotions,
      [selectedCourse.id]: {
        basePrice: Number(formValues.basePrice),
        percent: Number(formValues.percent),
        startDate: formValues.startDate,
        endDate: formValues.endDate,
      },
    }));
    closePromotionModal();
  };

  const finalPrice = Math.max(
    0,
    Number(formValues.basePrice || 0) * (1 - Number(formValues.percent || 0) / 100),
  );

  return (
    <section className="teacher-page teacher-promotions-page">
      <div className="teacher-promotions-toolbar" aria-label="Promotion filters">
        <label className="teacher-promotions-search">
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses..."
          />
        </label>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active Promotion</option>
          <option value="INACTIVE">No Promotion</option>
        </select>
      </div>

      <div className="teacher-promotions-grid">
        {promotionCourses.map((course) => (
          <PromotionCard
            key={course.id}
            course={course}
            promotion={promotions[course.id]}
            onSetPromotion={openPromotionModal}
          />
        ))}
      </div>

      {selectedCourse && (
        <div className="teacher-promotion-modal" role="dialog" aria-modal="true" aria-labelledby="promotion-modal-title">
          <form className="teacher-promotion-modal__panel" onSubmit={handleSubmit}>
            <header className="teacher-promotion-modal__header">
              <div>
                <h2 id="promotion-modal-title">Set Promotion</h2>
                <p>{selectedCourse.title}</p>
              </div>
              <button type="button" aria-label="Close promotion modal" onClick={closePromotionModal}>
                <X size={20} />
              </button>
            </header>

            <div className="teacher-promotion-modal__fields">
              <label>
                <span>Discount (%)</span>
                <input
                  name="percent"
                  type="number"
                  min="1"
                  max="100"
                  value={formValues.percent}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                <span>Start date</span>
                <div className="teacher-promotion-modal__date-input">
                  <CalendarDays size={16} />
                  <input name="startDate" type="date" value={formValues.startDate} onChange={handleFormChange} required />
                </div>
              </label>

              <label>
                <span>End date</span>
                <div className="teacher-promotion-modal__date-input">
                  <CalendarDays size={16} />
                  <input name="endDate" type="date" value={formValues.endDate} onChange={handleFormChange} required />
                </div>
              </label>

              <div className="teacher-promotion-modal__preview">
                <span>Preview Price</span>
                <strong>{formatCurrency(finalPrice)}</strong>
                <small>You save {formatCurrency(Number(formValues.basePrice || 0) - finalPrice)}</small>
              </div>
            </div>

            <footer className="teacher-promotion-modal__footer">
              <button type="button" onClick={closePromotionModal}>
                Cancel
              </button>
              <button type="submit">Apply Promotion</button>
            </footer>
          </form>
        </div>
      )}
    </section>
  );
};

export default PromotionsPage;
