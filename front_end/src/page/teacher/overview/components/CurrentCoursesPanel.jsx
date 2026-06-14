import CoursePreviewCard from "./CoursePreviewCard.jsx";
import PanelHeader from "./PanelHeader.jsx";

const CurrentCoursesPanel = ({ courses, coursesUrl }) => {
  return (
    <div className="teacher-panel teacher-panel--courses">
      <PanelHeader actionLabel="View all" href={coursesUrl} title="Current Courses" titleLevel="h1" />
      <div className="teacher-course-preview-grid">
        {courses.map((course) => (
          <CoursePreviewCard key={course.title} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CurrentCoursesPanel;
