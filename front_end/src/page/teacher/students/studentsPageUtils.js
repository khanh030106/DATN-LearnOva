export const filterStudents = ({ students, query }) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return students;
  }

  return students.filter((student) =>
    [student.name, student.email, ...student.courses].join(" ").toLowerCase().includes(normalizedQuery),
  );
};
