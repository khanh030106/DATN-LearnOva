import { courseTableColumns } from "../coursePageConfig.js";
import CourseCard from "./CourseCard.jsx";

const CoursesTable = ({ courses, onDeleteCourse, onUpdateCourse }) => {
  return (
    <div className="teacher-course-table">
      <div className="teacher-course-table__head">
        {courseTableColumns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onDelete={onDeleteCourse}
          onUpdate={onUpdateCourse}
        />
      ))}
    </div>
  );
};

export default CoursesTable;
