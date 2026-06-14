export const initialPromotions = {
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
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);

export const createPromotionFormValues = (course, existingPromotion) => ({
  basePrice: Math.round(existingPromotion?.basePrice ?? course.basePrice * 24000),
  percent: existingPromotion?.percent ?? 15,
  startDate: existingPromotion?.startDate ?? "2026-06-01",
  endDate: existingPromotion?.endDate ?? "2026-06-30",
});

export const calculatePromotionFinalPrice = (formValues) =>
  Math.max(0, Number(formValues.basePrice || 0) * (1 - Number(formValues.percent || 0) / 100));

export const filterPromotionCourses = ({ courses, promotions, query, statusFilter }) => {
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
};
