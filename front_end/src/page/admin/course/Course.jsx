import CourseFilters from "./filters/CourseFilters";
import CourseStatistics from "./statistics/CourseStatistics";
import CourseTable from "./courseTable/CourseTable";
import "./Course.css";

const Course = () => {
  return (
    <section className="coursePage" aria-label="Quản lý khóa học">
      <div className="courseContent">
        <CourseStatistics />
        <CourseFilters />
        <CourseTable />
      </div>
    </section>
  );
};

export default Course;
