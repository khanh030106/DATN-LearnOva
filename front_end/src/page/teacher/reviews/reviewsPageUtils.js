// Strips Vietnamese diacritics so search matches regardless of accents (e.g. "rat huu ich"
// finds "rất hữu ích"). "d with stroke" doesn't decompose via NFD since it's a distinct
// base letter, not a base letter + combining mark, so it's handled separately.
const stripDiacritics = (value) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const buildCourseFilterOptions = (reviews) => {
  const seen = new Map();
  reviews.forEach((review) => {
    if (!seen.has(review.courseId)) {
      seen.set(review.courseId, review.courseTitle);
    }
  });

  return [
    { label: "Tất cả khóa học", value: "ALL" },
    ...Array.from(seen, ([courseId, courseTitle]) => ({
      label: courseTitle,
      value: String(courseId),
    })),
  ];
};

export const filterReviews = ({ reviews, query, ratingFilter = "all", courseFilter = "ALL" }) => {
  const normalizedQuery = stripDiacritics(query.trim().toLowerCase());

  return reviews.filter((review) => {
    const matchesRating = ratingFilter === "all" || review.rating === Number(ratingFilter);
    const matchesCourse = courseFilter === "ALL" || String(review.courseId) === courseFilter;

    const matchesQuery =
      !normalizedQuery ||
      stripDiacritics(
        [review.userName, review.courseTitle, review.comment].filter(Boolean).join(" ").toLowerCase()
      ).includes(normalizedQuery);

    return matchesRating && matchesCourse && matchesQuery;
  });
};
