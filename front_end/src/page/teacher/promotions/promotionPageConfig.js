export const initialPromotions = {};

export const promotionStatusFilterOptions = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active Promotion" },
  { value: "INACTIVE", label: "No Promotion" },
];

export const emptyPromotionForm = {
  basePrice: "",
  percent: "",
  startDate: "",
  endDate: "",
};

export const formatPromotionCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);

export const createPromotionFormValues = (course, existingPromotion) => ({
  basePrice: course.basePrice,
  percent: existingPromotion?.percent ?? 15,
  startDate: existingPromotion?.startDate ?? new Date().toISOString().slice(0, 10),
  endDate: existingPromotion?.endDate ?? new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
});

export const calculatePromotionFinalPrice = (formValues) =>
  Math.max(0, Number(formValues.basePrice || 0) * (1 - Number(formValues.percent || 0) / 100));

export const filterPromotionCourses = ({ courses, query }) => {
  const normalizedQuery = query.trim().toLowerCase();
  return courses.filter((course) =>
    !course.isDeleted &&
    (!normalizedQuery ||
      course.title.toLowerCase().includes(normalizedQuery) ||
      course.category.toLowerCase().includes(normalizedQuery))
  );
};
