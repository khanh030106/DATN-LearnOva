import CourseLaunchChart from "./CourseLaunchChart/CourseLaunchChart.jsx";
import CourseCategoryChart from "./CourseCategoryChart/CourseCategoryChart.jsx";
import CourseSignupChart from "./CourseSignupChart/CourseSignupChart.jsx";
import "./CoursesTab.css";

const charts = [
  { id: "launch", component: CourseLaunchChart },
  { id: "category", component: CourseCategoryChart },
  { id: "signup", component: CourseSignupChart },
];

const CoursesTab = () => {
  return (
    <div className="coursesTabContent">
      <div className="coursesChartsGrid">
        {charts.map(({ id, component: ChartComponent }) => (
          <ChartComponent key={id} />
        ))}
      </div>
    </div>
  );
};

export default CoursesTab;
