import { useMemo, useState } from "react";
import { courses } from "../data/teacherDashboardData.js";
import PromotionCard from "./components/PromotionCard.jsx";
import PromotionModal from "./components/PromotionModal.jsx";
import PromotionsToolbar from "./components/PromotionsToolbar.jsx";
import {
  calculatePromotionFinalPrice,
  createPromotionFormValues,
  emptyPromotionForm,
  filterPromotionCourses,
  initialPromotions,
} from "./promotionPageConfig.js";
import "./PromotionsPage.css";

const PromotionsPage = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [promotions, setPromotions] = useState(initialPromotions);
  const [formValues, setFormValues] = useState(emptyPromotionForm);

  const promotionCourses = useMemo(
    () => filterPromotionCourses({ courses, promotions, query, statusFilter }),
    [promotions, query, statusFilter],
  );

  const openPromotionModal = (course) => {
    const existingPromotion = promotions[course.id];

    setSelectedCourse(course);
    setFormValues(createPromotionFormValues(course, existingPromotion));
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

  const finalPrice = calculatePromotionFinalPrice(formValues);

  return (
    <section className="teacher-page teacher-promotions-page">
      <PromotionsToolbar
        query={query}
        statusFilter={statusFilter}
        onQueryChange={setQuery}
        onStatusFilterChange={setStatusFilter}
      />

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
        <PromotionModal
          course={selectedCourse}
          formValues={formValues}
          finalPrice={finalPrice}
          onClose={closePromotionModal}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
};

export default PromotionsPage;
