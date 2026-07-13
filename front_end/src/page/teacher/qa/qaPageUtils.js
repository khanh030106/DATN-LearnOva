const stripDiacritics = (value) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const buildCourseFilterOptions = (questions) => {
  const seen = new Map();
  questions.forEach((question) => {
    if (!seen.has(question.courseId)) {
      seen.set(question.courseId, question.courseTitle);
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

export const filterQuestions = ({ questions, query, statusFilter = "all", courseFilter = "ALL" }) => {
  const normalizedQuery = stripDiacritics(query.trim().toLowerCase());

  return questions.filter((question) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unsolved" && !question.isSolved) ||
      (statusFilter === "solved" && question.isSolved) ||
      (statusFilter === "pinned" && question.isPinned);

    const matchesCourse = courseFilter === "ALL" || String(question.courseId) === courseFilter;

    const matchesQuery =
      !normalizedQuery ||
      stripDiacritics(
        [question.userName, question.courseTitle, question.lessonTitle, question.content]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
      ).includes(normalizedQuery);

    return matchesStatus && matchesCourse && matchesQuery;
  });
};
