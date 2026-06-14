import { ShieldCheck } from "lucide-react";
import CourseFilters from "./filters/CourseFilters";
import CourseStatistics from "./statistics/CourseStatistics";
import CourseTable from "./courseTable/CourseTable";
import coursesOverviewImage from "../../../assets/dashboard/courses.png";
import "./Course.css";

const Course = () => {
  return (
    <section className="coursePage" aria-label="Quản lý khóa học">
      <div className="courseContent">
        <div className="courseHero">
          <div className="courseHeroImageWrap">
            <img
              className="courseHeroImage"
              src={coursesOverviewImage}
              alt="Courses overview"
            />
          </div>

          <div className="courseHeroText">
            <h1>Courses</h1>
            <p>Manage all courses, content and curriculum across the platform.</p>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Keep learning content structured and up to date
            </span>
          </div>
        </div>

        <CourseStatistics />
        <CourseFilters />
        <CourseTable />
      </div>
    </section>
  );
};

export default Course;
