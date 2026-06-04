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
    label: "Tổng số khóa học",
    value: "10",
    trend: "tháng này",
    trendPercent: "+12.4%",
  },
  {
    id: "published",
    component: PublishedCoursesCard,
    label: "Đã xuất bản",
    value: "7",
    trend: "tháng này",
    trendPercent: "+8.5%",
  },
  {
    id: "pending",
    component: PendingReviewCard,
    label: "Chờ duyệt",
    value: "1",
    trend: "tháng này",
    trendPercent: "+25%",
  },
  {
    id: "suspended",
    component: SuspendedCoursesCard,
    label: "Tạm khóa",
    value: "1",
    trend: "tháng này",
    trendPercent: "-5.2%",
  },
  {
    id: "reported",
    component: ReportedCoursesCard,
    label: "Bị khiếu nại",
    value: "1",
    trend: "tháng này",
    trendPercent: "+18.2%",
  },
];

const CourseStatistics = () => {
  return (
    <section className="courseStatistics" aria-label="Thống kê khóa học">
      <div className="courseStatisticsGrid">
        {courseStatsData.map(({ id, component: StatCard, ...statProps }) => (
          <StatCard key={id} {...statProps} />
        ))}
      </div>
    </section>
  );
};

export default CourseStatistics;
