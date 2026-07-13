// Strips Vietnamese diacritics so search matches regardless of accents (e.g. "nguyen van a"
// finds "Nguyễn Văn A"). "d with stroke" doesn't decompose via NFD since it's a distinct
// base letter, not a base letter + combining mark, so it's handled separately.
const stripDiacritics = (value) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const buildCourseFilterOptions = (students) => {
  const seen = new Map();
  students.forEach((student) => {
    student.courses.forEach((course) => {
      if (!seen.has(course.courseId)) {
        seen.set(course.courseId, course.courseTitle);
      }
    });
  });

  return [
    { label: "Tất cả khóa học", value: "ALL" },
    ...Array.from(seen, ([courseId, courseTitle]) => ({
      label: courseTitle,
      value: String(courseId),
    })),
  ];
};

export const filterStudents = ({ students, query, statusFilter = "ALL", courseFilter = "ALL" }) => {
  const normalizedQuery = stripDiacritics(query.trim().toLowerCase());

  return students.filter((student) => {
    const matchesStatus = statusFilter === "ALL" || student.status === statusFilter;
    const matchesCourse =
      courseFilter === "ALL" || student.courses.some((c) => String(c.courseId) === courseFilter);

    const matchesQuery =
      !normalizedQuery ||
      stripDiacritics(
        [student.fullName, student.email, student.phone, ...student.courses.map((c) => c.courseTitle)]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
      ).includes(normalizedQuery);

    return matchesStatus && matchesCourse && matchesQuery;
  });
};
