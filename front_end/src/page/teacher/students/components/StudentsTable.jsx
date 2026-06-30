import { studentTableColumns } from "../studentsPageData.js";
import StudentRow from "./StudentRow.jsx";

const StudentsTable = ({ students, onViewDetail }) => (
  <div className="teacher-students-panel">
    <div className="teacher-students-table-head">
      {studentTableColumns.map((column) => (
        <span key={column}>{column}</span>
      ))}
    </div>

    {students.map((student) => (
      <StudentRow key={student.email} student={student} onViewDetail={onViewDetail} />
    ))}
  </div>
);

export default StudentsTable;
