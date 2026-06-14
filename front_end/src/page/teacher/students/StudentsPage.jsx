import { useMemo, useState } from "react";
import StudentsTable from "./components/StudentsTable.jsx";
import StudentsToolbar from "./components/StudentsToolbar.jsx";
import { studentList } from "./studentsPageData.js";
import { filterStudents } from "./studentsPageUtils.js";
import "./StudentsPage.css";

const StudentsPage = () => {
  const [query, setQuery] = useState("");

  const filteredStudents = useMemo(() => filterStudents({ students: studentList, query }), [query]);

  return (
    <section className="teacher-page teacher-students-page">
      <StudentsToolbar query={query} onQueryChange={setQuery} />
      <StudentsTable students={filteredStudents} />
    </section>
  );
};

export default StudentsPage;
