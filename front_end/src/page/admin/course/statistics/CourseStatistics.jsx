import TotalCoursesCard from "./cards/totalCourses/TotalCoursesCard";
import PublishedCoursesCard from "./cards/publishedCourses/PublishedCoursesCard";
import PendingReviewCard from "./cards/pendingReview/PendingReviewCard";
import SuspendedCoursesCard from "./cards/suspendedCourses/SuspendedCoursesCard";
import ReportedCoursesCard from "./cards/reportedCourses/ReportedCoursesCard";
import "./CourseStatistics.css";

const CourseStatistics = ({ courses = [], loading = false }) => {
  const valueOrLoading = (value) => (loading ? "..." : String(value));
  const publishedCount = courses.filter((course) => course.status === "PUBLISHED").length;
  const pendingReviewCount = courses.filter((course) => course.status === "PENDING_REVIEW").length;
  const archivedCount = courses.filter((course) => course.status === "ARCHIVED").length;
  const deletedCount = courses.filter((course) => course.status === "DELETED").length;

  const courseStatsData = [
    {
      id: "total",
      component: TotalCoursesCard,
      label: "Total Courses",
      value: valueOrLoading(courses.length),
      trend: "from database",
      trendPercent: "",
    },
    {
      id: "published",
      component: PublishedCoursesCard,
      label: "Published",
      value: valueOrLoading(publishedCount),
      trend: "status",
      trendPercent: "PUBLISHED",
    },
    {
      id: "pending",
      component: PendingReviewCard,
      label: "Pending Review",
      value: valueOrLoading(pendingReviewCount),
      trend: "status",
      trendPercent: "PENDING_REVIEW",
    },
    {
      id: "suspended",
      component: SuspendedCoursesCard,
      label: "Archived",
      value: valueOrLoading(archivedCount),
      trend: "status",
      trendPercent: "ARCHIVED",
    },
    {
      id: "reported",
      component: ReportedCoursesCard,
      label: "Deleted",
      value: valueOrLoading(deletedCount),
      trend: "status",
      trendPercent: "DELETED",
    },
  ];

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
