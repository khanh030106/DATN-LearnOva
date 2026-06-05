import TotalCoursesCard from "./cards/totalCourses/TotalCoursesCard";
import PublishedCoursesCard from "./cards/publishedCourses/PublishedCoursesCard";
import PendingReviewCard from "./cards/pendingReview/PendingReviewCard";
import SuspendedCoursesCard from "./cards/suspendedCourses/SuspendedCoursesCard";
import ReportedCoursesCard from "./cards/reportedCourses/ReportedCoursesCard";
import "./CourseStatistics.css";

const courseStatsData = [
  {
    id: "total",
    component: TotalCoursesCard,
    label: "Total Courses",
    value: "10",
    trend: "this month",
    trendPercent: "+12.4%",
  },
  {
    id: "published",
    component: PublishedCoursesCard,
    label: "Published",
    value: "7",
    trend: "this month",
    trendPercent: "+8.5%",
  },
  {
    id: "pending",
    component: PendingReviewCard,
    label: "Pending Review",
    value: "1",
    trend: "this month",
    trendPercent: "+25%",
  },
  {
    id: "suspended",
    component: SuspendedCoursesCard,
    label: "Suspended",
    value: "1",
    trend: "this month",
    trendPercent: "-5.2%",
  },
  {
    id: "reported",
    component: ReportedCoursesCard,
    label: "Reported",
    value: "1",
    trend: "this month",
    trendPercent: "+18.2%",
  },
];

const CourseStatistics = () => {
  return (
    <section className="courseStatistics" aria-label="Course Statistics">
      <div className="courseStatisticsGrid">
        {courseStatsData.map((statItem) => {
          const StatCard = statItem.component;
          const { id, ...statProps } = statItem;
          return <StatCard key={id} {...statProps} />;
        })}
      </div>
    </section>
  );
};

export default CourseStatistics;
