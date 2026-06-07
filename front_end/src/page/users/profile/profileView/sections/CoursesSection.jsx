import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  List,
  Search,
} from "lucide-react";
import { DEFAULT_ENROLLED_COURSES } from "../data/profileData";
import CourseCardGrid from "./CourseCardGrid";

const CoursesSection = ({ purchasedCourses = [], onBack, onOpenCourse }) => {
  const courses =
    purchasedCourses.length > 0
      ? purchasedCourses.map((course, index) => ({
          ...course,
          progress: course.progress || (index % 2 === 0 ? 65 : 40),
          lessonsDone: course.lessonsDone || 12 + index * 4,
          lessonsTotal: course.lessonsTotal || 40,
          remaining: course.remaining || "Còn 3h 15m",
          rating: course.rating || 4.8,
          reviews: course.reviews || "856",
        }))
      : DEFAULT_ENROLLED_COURSES;

  return (
    <>
      <div className="courses-topbar">
        <div>
          <h2>Khóa học tham gia</h2>
          <div className="course-tabs">
            <button className="course-tab active" type="button">
              Đang học
            </button>
            <button className="course-tab" type="button">
              Hoàn thành
            </button>
          </div>
        </div>

        <div className="course-tools">
          <label className="course-search">
            <input type="text" placeholder="Tìm kiếm khóa học..." />
            <Search size={15} />
          </label>
          <button className="course-sort" type="button">
            Mới nhất <ChevronDown size={14} />
          </button>
          <button
            className="course-view active"
            type="button"
            aria-label="Grid view"
          >
            <Grid2X2 size={16} />
          </button>
          <button className="course-view" type="button" aria-label="List view">
            <List size={16} />
          </button>
        </div>
      </div>

      {courses.length > 0 ? (
        <>
          <CourseCardGrid
            courses={courses}
            onOpenCourse={onOpenCourse}
            variant="mine"
          />

          <div className="course-pagination">
            <button type="button">
              <ChevronLeft size={14} />
            </button>
            <button className="active" type="button">
              1
            </button>
            <button type="button">2</button>
            <button type="button">3</button>
            <span>...</span>
            <button type="button">5</button>
            <button type="button">
              <ChevronRight size={14} />
            </button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h4>Bạn chưa sở hữu khóa học nào</h4>
          <p>
            Hãy khởi đầu hành trình nâng cao trình độ bằng việc chọn các khóa
            học phù hợp.
          </p>
          <button onClick={onBack} className="btn btn-primary" type="button">
            Xem danh sách khóa học
          </button>
        </div>
      )}
    </>
  );
};

export default CoursesSection;
