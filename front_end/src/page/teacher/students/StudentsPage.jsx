import { useEffect, useMemo, useState } from "react";
import StudentsTable from "./components/StudentsTable.jsx";
import StudentsToolbar from "./components/StudentsToolbar.jsx";
import StudentDetailModal from "./components/StudentDetailModal.jsx";
import { getMyStudents } from "../../../api/teacher/CourseApi.js";
import "./StudentsPage.css";

const filterStudents = (students, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return students;
  return students.filter((s) =>
    [s.fullName, s.email, ...s.courseNames].join(" ").toLowerCase().includes(q)
  );
};

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [detailStudent, setDetailStudent] = useState(null);

  useEffect(() => {
    getMyStudents()
      .then(setStudents)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filteredStudents = useMemo(() => filterStudents(students, query), [students, query]);

  if (isLoading) {
    return (
      <section className="teacher-page teacher-students-page">
        <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
          Loading students...
        </div>
      </section>
    );
  }

  return (
    <section className="teacher-page teacher-students-page">
      <StudentsToolbar query={query} onQueryChange={setQuery} />
      <StudentsTable students={filteredStudents} onViewDetail={setDetailStudent} />

      {detailStudent && (
        <StudentDetailModal
          student={detailStudent}
          onClose={() => setDetailStudent(null)}
        />
      )}
    </section>
  );
};

export default StudentsPage;
